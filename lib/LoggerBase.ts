import { Logger, type ILogObj } from "tslog";

export abstract class LoggerBase {
  protected readonly logger: Logger<ILogObj>;

  protected constructor(context: string) {
    this.logger = new Logger({ name: context });
  }
}
