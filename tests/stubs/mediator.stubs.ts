import { CommandHandler } from '../../lib/CommandHandlerBase';
import type { ICommand, IQuery } from '../../lib/Message';
import { QueryHandler } from '../../lib/QueryHandlerBase';

class DoubleCommand implements ICommand {
  constructor(public value: number) {}
}

class DoubleCommandHandler extends CommandHandler<DoubleCommand, number> {
  async handle(command: DoubleCommand): Promise<number> {
    return command.value * 2;
  }
}

class IncrementQuery implements IQuery {
  constructor(public value: number) {}
}

class IncrementQueryHandler extends QueryHandler<IncrementQuery, number> {
  async handle(query: IncrementQuery): Promise<number> {
    return query.value + 1;
  }
}

export { DoubleCommand, DoubleCommandHandler, IncrementQuery, IncrementQueryHandler };
