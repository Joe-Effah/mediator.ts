import { Mediator } from "../lib/Mediator";
import { validationBehavior } from "./features/behaviours/general";
import { AddStudentCommand, AddStudentHandler } from "./features/students/commands/addStudent.command";
import { UpdateStudentNameCommand, UpdateStudentNameHandler } from "./features/students/commands/updateStudentName.command";
import { GetLatestStudentInClassHandler, GetLatestStudentInClassQuery } from "./features/students/queries/getLatestStudentInClass.query";
import { StudentRepository } from "./repository/repository";


export async function runStudentFeature() {
  const repository = new StudentRepository();

  Mediator.registerCommand(AddStudentCommand, new AddStudentHandler(repository));
  Mediator.registerCommand(UpdateStudentNameCommand, new UpdateStudentNameHandler(repository));
  Mediator.registerQuery(GetLatestStudentInClassQuery, new GetLatestStudentInClassHandler(repository));

  const newStudent = await Mediator.send(new AddStudentCommand('s1', 'Alice', 'Math'));
  console.log('Created student:', newStudent);

  const updatedStudent = await Mediator.send(new UpdateStudentNameCommand('s1', 'Alice Johnson'));
  console.log('Updated student:', updatedStudent);

  const latestInMath = await Mediator.query(new GetLatestStudentInClassQuery('Math'));
  console.log('Latest student in Math:', latestInMath);
}


await runStudentFeature();