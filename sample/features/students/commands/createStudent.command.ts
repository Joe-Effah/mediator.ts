import type { ICommand } from '../../../../lib/Message';
import { CommandHandler } from '../../../../lib/CommandHandlerBase';
import type { StudentDto, StudentRepository } from '../../../repository/repository';

export class CreateStudentCommand implements ICommand {
  constructor(
    public studentId: string,
    public name: string,
    public className: string,
  ) {}
}

export class CreateStudentHandler extends CommandHandler<CreateStudentCommand, StudentDto> {
  constructor(private readonly repository: StudentRepository) {
    super();
  }

  async handle(command: CreateStudentCommand): Promise<StudentDto> {
    return this.repository.add({
      id: command.studentId,
      name: command.name,
      className: command.className,
    });
  }
}
