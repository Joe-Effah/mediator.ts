import { LoggerBase } from './LoggerBase';
import type { ICommand, IHandler } from './Message';

export abstract class CommandHandler<TCommand extends ICommand, TResult>
  extends LoggerBase
  implements IHandler<TCommand, TResult>
{
  public constructor() {
    super('command.handler');
  }

  abstract handle(command: TCommand): Promise<TResult>;
}


