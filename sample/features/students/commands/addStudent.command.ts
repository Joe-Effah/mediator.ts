import type { ICommand } from '../../../../lib/Message';
import { CommandHandler } from '../../../../lib/CommandHandlerBase';
import type { StudentDto, StudentRepository } from '../../../repository/repository';

export type AddStudentResponse = StudentDto;

export class AddStudentCommand implements ICommand {
  constructor(
    public studentId: string,
    public name: string,
    public className: string,
  ) {}
}

export class AddStudentHandler extends CommandHandler<AddStudentCommand, AddStudentResponse> {
  constructor(private readonly repository: StudentRepository) {
    super();
  }

  async handle(command: AddStudentCommand): Promise<AddStudentResponse> {
    return this.repository.add({
      id: command.studentId,
      name: command.name,
      className: command.className,
    });
  }
}
