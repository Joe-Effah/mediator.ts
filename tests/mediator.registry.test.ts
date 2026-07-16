import { beforeEach, describe, expect, it } from 'bun:test';
import { Mediator } from '../lib/Mediator';
import { createDoubleCommand, createDoubleCommandHandler } from './Factories/mediator.factories';
import { DoubleCommand } from './stubs/mediator.stubs';

describe('Mediator registry state', () => {
  beforeEach(() => {
    Mediator.clear();
  });

  it('clears registry state between runs', async () => {
    Mediator.registerCommand(DoubleCommand, createDoubleCommandHandler());
    Mediator.clear();

    await expect(Mediator.send(createDoubleCommand(3))).rejects.toThrow(
      'No command handler registered for DoubleCommand',
    );
  });
});
