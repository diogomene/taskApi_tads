import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { GetAllTaskOutputDto } from "../../../usecases/dto/getAll.dto";
import { GetAllTaskUsecase } from "../../../usecases/task/getAll.usecase";

export type GetAllTaskResponseDto = GetAllTaskOutputDto

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Retrieve all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uid:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 */
export class GetAllTaskRoute extends Route{
    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly getAllTaskUsecase : GetAllTaskUsecase
    ){
        super()
    }

    public static newInstance(
        getAllTaskUsecase : GetAllTaskUsecase
    ){
        return new GetAllTaskRoute(
            "/",
            "get",
            getAllTaskUsecase
        )
    }
    private static formatRes(input: GetAllTaskOutputDto){
        return input.map((task)=>{
            return {
                uid: task.uid,
                name: task.name,
                description: task.description,
                dueDate: task.dueDate,
            }
        })
    }
    protected getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (_: Request, response: Response) =>{
            const tasks = await this.getAllTaskUsecase.execute()
            const tasksResponse = GetAllTaskRoute.formatRes(tasks)

            response.status(200).json(tasksResponse)
        }
    }

    protected getMethod(): HttpMethod {
        return this.method
    }
    protected getPath(): string {
        return this.path
    }
    
}