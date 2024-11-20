import { TaskDao } from "../../dao/TaskDao";
import { Task } from "../../entity/Task";
import { UpdateTaskInputDto } from "../dto/update.dto";
import { Usecase } from "../usecase";

export class UpdateTaskUsecase implements Usecase<UpdateTaskInputDto, void>{
    constructor(private readonly taskDao : TaskDao){}
    async execute({uid, description, name, dueDate}: UpdateTaskInputDto): Promise<void> {
        const task = new Task(uid, name, description, new Date(), dueDate)
        return await this.taskDao.update(task)
    }
}