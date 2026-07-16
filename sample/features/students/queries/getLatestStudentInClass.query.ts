import type { IQuery } from '../../../../lib/Message';
import { QueryHandler } from '../../../../lib/QueryHandlerBase';
import type { StudentDto, StudentRepository } from '../../../repository/repository';

export type GetLatestStudentInClassResponse = StudentDto | null;

export class GetLatestStudentInClassQuery implements IQuery {
  constructor(public className: string) {}
}

export class GetLatestStudentInClassHandler extends QueryHandler<GetLatestStudentInClassQuery, GetLatestStudentInClassResponse> {
  constructor(private readonly repository: StudentRepository) {
    super();
  }

  async handle(query: GetLatestStudentInClassQuery): Promise<GetLatestStudentInClassResponse> {
    return this.repository.getLatestByClass(query.className);
  }
}
