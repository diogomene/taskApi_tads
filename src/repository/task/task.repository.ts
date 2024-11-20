import { PrismaClient } from "@prisma/client";
import { TaskDao } from "../../dao/TaskDao";
import { Task } from "../../entity/Task";

type TaskDbEntity = {
  uid: string;
  name: string;
  description: string;
  dueDate: Date | null;
  creationDate: Date;
};

export class TaskRepository implements TaskDao {
  constructor(private readonly prismaClient: PrismaClient) {}
  private toTaskDbEntity(task: Task): TaskDbEntity {
    return {
      uid: task.getUid(),
      name: task.getName(),
      description: task.getDescription(),
      dueDate: task.getDueDate()||null,
      creationDate: task.getCreationDate(),
    };
  }
  private toTask(taskDbEntity: TaskDbEntity): Task {
    return new Task(
      taskDbEntity.uid,
      taskDbEntity.name,
      taskDbEntity.description,
      taskDbEntity.creationDate,
      taskDbEntity.dueDate||undefined
    );
  }
  async save(task: Task): Promise<string> {
    const taskDbEntity = this.toTaskDbEntity(task);
    this.prismaClient.task.create({ data: taskDbEntity });
    return task.getUid();
  }
  async getAll(): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
  async get(uid: string): Promise<Task> {
    const taskDbEntity = await this.prismaClient.task.findUnique({ where: { uid } });
    if (!taskDbEntity) {
        throw new Error(`Task with uid ${uid} not found`);
    }
    return this.toTask(taskDbEntity);
  }
  async update(task: Task): Promise<void> {
    await this.prismaClient.task.update({
        where: { uid: task.getUid() },
        data: this.toTaskDbEntity(task),
    })
  }
  async delete(uid: string): Promise<Task> {
    const taskDbEntity = await this.prismaClient.task.delete({ where: { uid } });
    return this.toTask(taskDbEntity);
  }
}
