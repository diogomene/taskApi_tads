import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { UpdateTaskUsecase } from "../../../usecases/task/update.usecase";

export type UpdateTaskResponseDto = void

/**
 * @swagger
 * /api/{uid}:
 *   put:
 *     summary: Update an existing task
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
export class UpdateTaskRoute extends Route{
    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly updataTaskUsecase : UpdateTaskUsecase
    ){
        super()
    }

    public static newInstance(
        updataTaskUsecase : UpdateTaskUsecase
    ){
        return new UpdateTaskRoute(
            "/:uid",
            "put",
            updataTaskUsecase
        )
    }

    protected getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) =>{
            const {
                uid,
                name,
                description,
                dueDate
            } = request.params
            await this.updataTaskUsecase.execute(
                {
                    uid: uid,
                    name: name,
                    description: description,
                    dueDate: new Date(dueDate),
                }
            )
            response.status(200)
        }
    }

    protected getMethod(): HttpMethod {
        return this.method
    }
    protected getPath(): string {
        return this.path
    }
    
}