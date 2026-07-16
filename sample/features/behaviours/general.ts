import type { ICommand, IPipelineBehavior, IQuery } from "../../../lib/Message";

export const validationBehavior: IPipelineBehavior<ICommand | IQuery, any> = {
  validate(message) {
    if ('studentId' in message && typeof message.studentId === 'string' && message.studentId.trim() === '') {
      throw new Error('studentId is required');
    }

    if ('name' in message && typeof message.name === 'string' && message.name.trim() === '') {
      throw new Error('name is required');
    }

    if ('className' in message && typeof message.className === 'string' && message.className.trim() === '') {
      throw new Error('className is required');
    }
  },
};

