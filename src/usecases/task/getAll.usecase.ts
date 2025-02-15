import { TaskDao } from "../../dao/TaskDao"
import { Task } from "../../entity/Task"
import { GetTaskOutputDto } from "../dto/get.dto"
import { GetAllTaskOutputDto } from "../dto/getAll.dto"
import { Usecase } from "../usecase"
import { GetTaskUsecase } from "./get.usecase"




export class GetAllTaskUsecase implements Usecase<void,GetAllTaskOutputDto>{
    constructor(private readonly taskDao : TaskDao){}
    
    static formatOutput(tasks: Task[]) : GetAllTaskOutputDto{
        return tasks.map((task:Task):GetTaskOutputDto=>{
            return GetTaskUsecase.formatOutput(task)
        })
    }

    public async execute(): Promise<GetAllTaskOutputDto> {
        const tasks = await this.taskDao.getAll()
        return GetAllTaskUsecase.formatOutput(tasks)
    }

}
