export interface ICommand {}
export interface IQuery {}

export interface IHandler<TMessage, TResult> {
  handle(message: TMessage): Promise<TResult>;
}

export interface IPipelineBehavior<TMessage, TResult> {
  before?(message: TMessage): Promise<void> | void;
  validate?(message: TMessage): Promise<void> | void;
  after?(message: TMessage, result: TResult): Promise<void> | void;
  onError?(message: TMessage, error: Error): Promise<void> | void;
}

export type Constructor<T> = new (...args: any[]) => T;
