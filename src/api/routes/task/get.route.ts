import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { GetTaskOutputDto } from "../../../usecases/dto/get.dto";
import { GetTaskUsecase } from "../../../usecases/task/get.usecase";

export type GetTaskResponseDto = GetTaskOutputDto

export class GetTaskRoute extends Route{
    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly getTaskUsecase : GetTaskUsecase
    ){
        super()
    }

    public static newInstance(
        getTaskUsecase : GetTaskUsecase
    ){
        return new GetTaskRoute(
            "/:uid",
            "get",
            getTaskUsecase
        )
    }
    private static formatRes(input: GetTaskOutputDto){
        return {
            uid: input.uid,
            name: input.name,
            description: input.description,
            dueDate: input.dueDate
        }
    }
    protected getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) =>{
            const {uid} = request.params
            try{
                const task = await this.getTaskUsecase.execute({uid:uid})
                const taskResponse = GetTaskRoute.formatRes(task)
                response.status(200).json(taskResponse)
            }catch{
                response.status(404).json()
            }
        }
    }

    protected getMethod(): HttpMethod {
        return this.method
    }
    protected getPath(): string {
        return this.path
    }
    
}