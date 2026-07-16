export interface StudentDto {
  id: string;
  name: string;
  className: string;
  createdAt: Date;
}

export class StudentRepository {
  private students: StudentDto[] = [];

  add(student: Omit<StudentDto, 'createdAt'>): StudentDto {
    const record: StudentDto = { ...student, createdAt: new Date() };
    this.students.push(record);
    return { ...record };
  }

  updateName(studentId: string, newName: string): StudentDto | null {
    const student = this.students.find((item) => item.id === studentId);
    if (!student) {
      return null;
    }

    student.name = newName;
    return { ...student };
  }

  getLatestByClass(className: string): StudentDto | null {
    const studentsInClass = this.students.filter((item) => item.className === className);
    if (studentsInClass.length === 0) {
      return null;
    }

    const latest = studentsInClass.reduce((latest, item) =>
      item.createdAt > latest.createdAt ? item : latest,
    studentsInClass[0]);

    return latest ? { ...latest } : null;
  }
}
