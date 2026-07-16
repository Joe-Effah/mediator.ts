import {
  DoubleCommand,
  DoubleCommandHandler,
  IncrementQuery,
  IncrementQueryHandler,
} from '../stubs/mediator.stubs';

export const createDoubleCommand = (value = 3) => new DoubleCommand(value);
export const createDoubleCommandHandler = () => new DoubleCommandHandler();
export const createIncrementQuery = (value = 4) => new IncrementQuery(value);
export const createIncrementQueryHandler = () => new IncrementQueryHandler();
