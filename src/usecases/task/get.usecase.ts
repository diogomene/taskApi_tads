import { TaskDao } from "../../dao/TaskDao";
import { Task } from "../../entity/Task";
import { GetTaskInputDto, GetTaskOutputDto } from "../dto/get.dto";
import { Usecase } from "../usecase";

export class GetTaskUsecase implements Usecase<GetTaskInputDto, GetTaskOutputDto>{
    constructor( private readonly taskDao: TaskDao){}
    public static formatOutput(task:Task):GetTaskOutputDto{
        return {
            description: task.getDescription(),
            name: task.getName(),
            uid: task.getUid(),
            dueDate: task.getDueDate()
        }
    }
    public async execute({uid}: GetTaskInputDto): Promise<GetTaskOutputDto> {
        const task = await this.taskDao.get(uid)
        return GetTaskUsecase.formatOutput(task)
    }
}