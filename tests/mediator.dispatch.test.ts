import { beforeEach, describe, expect, it } from 'bun:test';
import { Mediator } from '../lib/Mediator';
import {
  createDoubleCommand,
  createDoubleCommandHandler,
  createIncrementQuery,
  createIncrementQueryHandler,
} from './Factories/mediator.factories';
import { DoubleCommand, IncrementQuery } from './stubs/mediator.stubs';

describe('Mediator dispatch behavior', () => {
  beforeEach(() => {
    Mediator.clear();
  });

  it('registers and dispatches a command handler by message type', async () => {
    Mediator.registerCommand(DoubleCommand, createDoubleCommandHandler());

    const result = await Mediator.send(createDoubleCommand(3));

    expect(result).toBe(6);
  });

  it('registers and dispatches a query handler by message type', async () => {
    Mediator.registerQuery(IncrementQuery, createIncrementQueryHandler());

    const result = await Mediator.query(createIncrementQuery(4));

    expect(result).toBe(5);
  });

  it('supports legacy direct handler dispatch via send(handler, message)', async () => {
    const result = await Mediator.send(createDoubleCommandHandler(), createDoubleCommand(5));

    expect(result).toBe(10);
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
