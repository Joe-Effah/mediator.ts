import type {
  Constructor,
  ICommand,
  IHandler,
  IQuery,
  IPipelineBehavior,
} from './Message';

class Mediator {
  private static commandHandlers = new Map<Constructor<ICommand>, IHandler<ICommand, any>>();
  private static queryHandlers = new Map<Constructor<IQuery>, IHandler<IQuery, any>>();
  private static pipelineBehaviors: Array<IPipelineBehavior<ICommand | IQuery, any>> = [];

  static registerCommand<TCommand extends ICommand, TResult>(
    messageType: Constructor<TCommand>,
    handler: IHandler<TCommand, TResult>,
  ): void {
    this.commandHandlers.set(messageType, handler as IHandler<ICommand, any>);
  }

  static registerQuery<TQuery extends IQuery, TResult>(
    messageType: Constructor<TQuery>,
    handler: IHandler<TQuery, TResult>,
  ): void {
    this.queryHandlers.set(messageType, handler as IHandler<IQuery, any>);
  }

  static useBehavior<TMessage extends ICommand | IQuery, TResult>(
    behavior: IPipelineBehavior<TMessage, TResult>,
  ): void {
    this.pipelineBehaviors.push(behavior as IPipelineBehavior<ICommand | IQuery, any>);
  }

  static async send<TCommand extends ICommand, TResult>(
    command: TCommand,
  ): Promise<TResult>;
  static async send<TCommand, TResult>(
    handler: { handle(cmd: TCommand): Promise<TResult> },
    command: TCommand,
  ): Promise<TResult>;
  static async send<TCommand extends ICommand, TResult>(
    handlerOrCommand: any,
    command?: any,
  ): Promise<TResult> {
    if (command !== undefined) {
      return this.executeWithPipeline(command, handlerOrCommand);
    }

    const typedCommand = handlerOrCommand as TCommand;
    const handler = this.commandHandlers.get(
      typedCommand.constructor as Constructor<TCommand>,
    ) as IHandler<TCommand, TResult> | undefined;

    if (!handler) {
      throw new Error(`No command handler registered for ${typedCommand.constructor.name}`);
    }

    return this.executeWithPipeline(typedCommand, handler);
  }

  static async query<TQuery extends IQuery, TResult>(query: TQuery): Promise<TResult> {
    const handler = this.queryHandlers.get(
      query.constructor as Constructor<TQuery>,
    ) as IHandler<TQuery, TResult> | undefined;

    if (!handler) {
      throw new Error(`No query handler registered for ${query.constructor.name}`);
    }

    return this.executeWithPipeline(query, handler);
  }

  private static async executeWithPipeline<TMessage extends ICommand | IQuery, TResult>(
    message: TMessage,
    handler: IHandler<TMessage, TResult>,
  ): Promise<TResult> {
    for (const behavior of this.pipelineBehaviors) {
      if (behavior.before) {
        await behavior.before(message as TMessage);
      }
    }

    for (const behavior of this.pipelineBehaviors) {
      if (behavior.validate) {
        await behavior.validate(message as TMessage);
      }
    }

    let result: TResult;
    try {
      result = await handler.handle(message);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error(String(error));
      for (const behavior of this.pipelineBehaviors) {
        if (behavior.onError) {
          await behavior.onError(message as TMessage, normalizedError);
        }
      }
      throw normalizedError;
    }

    for (const behavior of this.pipelineBehaviors) {
      if (behavior.after) {
        await behavior.after(message as TMessage, result);
      }
    }

    return result;
  }

  static clear(): void {
    this.commandHandlers.clear();
    this.queryHandlers.clear();
    this.pipelineBehaviors = [];
  }
}

export { Mediator };


// TODO: Move from string-based registry to command.Name static property
// This will make registration type-safe and prevent typos
// e.g. CreateLeadCommand.Name instead of "CreateLeadCommand"

// TODO: Consider a full Mediator.send(payload) API
// Right now we still need to manually provide the handler
// Future: Mediator should infer the handler from the payload type

// TODO: Add pipeline hooks (optional, later)
// logging before and after / validation before running the handler /
// domain events after running the handler can be triggered here
// before or after the handler executes

// TODO: Enforce that all commands implement a common interface
// so that send() can safely infer the payload -> handler mapping

// TODO: Add runtime validation for enum/string conversions
// source/captureType currently rely on input strings
// use type guards or mapping functions to enforce domain types

// TODO: Add a helper to map Lead -> CreateLeadResponse
// So endpoints never return internal domain entities directly

// NOTE: Right now, we instantiate handlers per request
// This is fine for now, but a mediator registry will remove these 'new's
