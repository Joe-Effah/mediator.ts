import { beforeEach, describe, expect, it } from 'bun:test';
import { Mediator } from '../lib/Mediator';
import {
  createDoubleCommand,
  createDoubleCommandHandler,
  createIncrementQuery,
  createIncrementQueryHandler,
} from './Factories/mediator.factories';
import { DoubleCommand, IncrementQuery } from './stubs/mediator.stubs';

describe('Mediator pipeline behavior', () => {
  beforeEach(() => {
    Mediator.clear();
  });

  it('applies pipeline validation before handler execution', async () => {
    let validated = false;

    Mediator.useBehavior({
      validate(message) {
        validated = true;
        if ((message as any).value <= 0) {
          throw new Error('value must be positive');
        }
      },
    });

    Mediator.registerCommand(DoubleCommand, createDoubleCommandHandler());

    const result = await Mediator.send(createDoubleCommand(2));

    expect(validated).toBe(true);
    expect(result).toBe(4);
  });

  it('runs logging and event pipeline hooks after handler execution', async () => {
    const events: string[] = [];

    Mediator.useBehavior({
      before(message) {
        events.push(`before:${message.constructor.name}`);
      },
      after(message, result) {
        events.push(`after:${message.constructor.name}:${result}`);
      },
    });

    Mediator.registerCommand(DoubleCommand, createDoubleCommandHandler());

    const result = await Mediator.send(createDoubleCommand(3));

    expect(result).toBe(6);
    expect(events).toEqual(['before:DoubleCommand', 'after:DoubleCommand:6']);
  });

  it('throws when a command handler is not registered', async () => {
    await expect(Mediator.send(createDoubleCommand(7))).rejects.toThrow(
      'No command handler registered for DoubleCommand',
    );
  });

  it('throws when a query handler is not registered', async () => {
    await expect(Mediator.query(createIncrementQuery(7))).rejects.toThrow(
      'No query handler registered for IncrementQuery',
    );
  });
});
