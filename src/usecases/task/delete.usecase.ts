import { TaskDao } from "../../dao/TaskDao";
import { DeleteTaskInputDto, DeleteTaskOutputDto } from "../dto/delete.dto";
import { GetTaskOutputDto } from "../dto/get.dto";
import { Usecase } from "../usecase";
import { GetTaskUsecase } from "./get.usecase";

export class DeleteTaskUsecase implements Usecase<DeleteTaskInputDto, DeleteTaskOutputDto>{
    constructor(private readonly taskDao : TaskDao){}
    public async execute({uid}: DeleteTaskInputDto): Promise<GetTaskOutputDto> {
        const deletedTask = await this.taskDao.delete(uid)
        return GetTaskUsecase.formatOutput(deletedTask)
    }
}