import { Task } from "../entity/Task";

export interface TaskDao {
  save(task: Task): Promise<string>;
  getAll(): Promise<Task[]>;
  get(uid: string): Promise<Task>;
  update(task: Task): Promise<void>;
  delete(uid: string): Promise<Task>
}
