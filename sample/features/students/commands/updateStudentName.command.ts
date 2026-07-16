import type { ICommand } from '../../../../lib/Message';
import { CommandHandler } from '../../../../lib/CommandHandlerBase';
import type { StudentDto, StudentRepository } from '../../../repository/repository';

export type UpdateStudentNameResponse = StudentDto | null;

export class UpdateStudentNameCommand implements ICommand {
  constructor(public studentId: string, public name: string) {}
}

export class UpdateStudentNameHandler extends CommandHandler<UpdateStudentNameCommand, UpdateStudentNameResponse> {
  constructor(private readonly repository: StudentRepository) {
    super();
  }

  async handle(command: UpdateStudentNameCommand): Promise<UpdateStudentNameResponse> {
    return this.repository.updateName(command.studentId, command.name);
  }
}
