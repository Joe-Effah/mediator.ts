
import { LoggerBase } from './LoggerBase';
import type { IHandler, IQuery } from './Message';

export abstract class QueryHandler<TQuery extends IQuery, TResult>
  extends LoggerBase
  implements IHandler<TQuery, TResult>
{
  public constructor() {
    super('query.handler');
  }

  abstract handle(query: TQuery): Promise<TResult>;
}
