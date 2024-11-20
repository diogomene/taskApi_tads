import { TaskDao } from "../../dao/TaskDao"
import { Task } from "../../entity/Task"
import { CreateTaskInputDto, CreateTaskOutputDto } from "../dto/create.dto"
import { Usecase } from "../usecase"

export class CreateTaskUsecase implements Usecase<CreateTaskInputDto, CreateTaskOutputDto>{
    constructor(private readonly taskDao: TaskDao){}
    public async execute({name, description,dueDate}: CreateTaskInputDto): Promise<CreateTaskOutputDto> {
        const task = Task.create(name, description, dueDate)
        return {uid: await this.taskDao.save(task)}
    }
}