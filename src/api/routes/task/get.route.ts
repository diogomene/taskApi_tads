import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { GetTaskOutputDto } from "../../../usecases/dto/get.dto";
import { GetTaskUsecase } from "../../../usecases/task/get.usecase";

export type GetTaskResponseDto = GetTaskOutputDto

/**
 * @swagger
 * /api/{uid}:
 *   get:
 *     summary: Retrieve a task by UID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the task
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Task not found
 */
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