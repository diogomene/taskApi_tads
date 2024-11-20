import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { GetTaskOutputDto } from "../../../usecases/dto/get.dto";
import { DeleteTaskOutputDto } from "../../../usecases/dto/delete.dto";
import { DeleteTaskUsecase } from "../../../usecases/task/delete.usecase";

export type DeleteTaskResponseDto = DeleteTaskOutputDto

export class DeleteTaskRoute extends Route{
    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly deleteTaskUsecase : DeleteTaskUsecase
    ){
        super()
    }

    public static newInstance(
        deleteTaskUsecase : DeleteTaskUsecase
    ){
        return new DeleteTaskRoute(
            "/:uid",
            "delete",
            deleteTaskUsecase
        )
    }
    private static formatRes(input: GetTaskOutputDto){
        return {
            uid: input.uid,
            name: input.name,
            description: input.description,
            dueData: input.dueDate,
        }
    }
    protected getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) =>{
            const {uid} = request.params
            const deletedTask = await this.deleteTaskUsecase.execute({uid})
            const deletedTaskResponse = DeleteTaskRoute.formatRes(deletedTask)

            response.status(200).json(deletedTaskResponse)
        }
    }

    protected getMethod(): HttpMethod {
        return this.method
    }
    protected getPath(): string {
        return this.path
    }
    
}