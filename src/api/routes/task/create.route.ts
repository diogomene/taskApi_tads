import { Request, Response } from "express";
import { CreateTaskInputDto, CreateTaskOutputDto } from "../../../usecases/dto/create.dto";
import { CreateTaskUsecase } from "../../../usecases/task/create.usecase";
import { HttpMethod, Route } from "../route";

export type CreateTaskResponseDto = CreateTaskOutputDto

/**
 * @swagger
 * /api:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       description: Task object that needs to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - dueDate
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 */
export class CreateTaskRoute extends Route{
    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly createTaskUsecase : CreateTaskUsecase
    ){
        super()
    }

    public static newInstance(
        createTaskUsecase : CreateTaskUsecase
    ){
        return new CreateTaskRoute(
            "/",
            "post",
            createTaskUsecase
        )
    }
    private static formatRes(input: CreateTaskOutputDto){
        return {uid: input.uid}
    }
    protected getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) =>{
            const {name, description, dueDate} = request.body
            const newTask : CreateTaskInputDto = {
                name: name,
                description: description,
                dueDate: dueDate
            }
            const savedTaskOutDto = await this.createTaskUsecase.execute(newTask)
            const res = CreateTaskRoute.formatRes(savedTaskOutDto)
            response.status(201).json(res)
        }
    }
    protected getMethod(): HttpMethod {
        return this.method
    }
    protected getPath(): string {
        return this.path
    }
}