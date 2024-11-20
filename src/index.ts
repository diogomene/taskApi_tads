import { ApiExpress } from "./api/api.express"
import { JwtMiddleware } from "./api/middleware/jwt/jwt.middleware"
import { CreateTaskRoute } from "./api/routes/task/create.route"
import { DeleteTaskRoute } from "./api/routes/task/delete.route"
import { GetTaskRoute } from "./api/routes/task/get.route"
import { GetAllTaskRoute } from "./api/routes/task/getAll.route"
import { UpdateTaskRoute } from "./api/routes/task/update.route"
import { prisma } from "./repository/prisma"
import { TaskRepository } from "./repository/task/task.repository"
import { JwtService } from "./service/jwt.service"
import { AuthenticateJwtUsecase } from "./usecases/jwt/jwt.usecase"
import { CreateTaskUsecase } from "./usecases/task/create.usecase"
import { DeleteTaskUsecase } from "./usecases/task/delete.usecase"
import { GetTaskUsecase } from "./usecases/task/get.usecase"
import { GetAllTaskUsecase } from "./usecases/task/getAll.usecase"
import { UpdateTaskUsecase } from "./usecases/task/update.usecase"

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 9000

function bootstrap(port:number){
    const repository = new TaskRepository(prisma)
    const jwtService = new JwtService()

    const createTaskUseCase = new CreateTaskUsecase(repository)
    const getTaskUsecase = new GetTaskUsecase(repository)
    const getAllTaskUsecase = new GetAllTaskUsecase(repository)
    const deleteTaskUsecase = new DeleteTaskUsecase(repository)
    const updataTaskUsecase = new UpdateTaskUsecase(repository)
    const authenticateJwtUsecase = new AuthenticateJwtUsecase(jwtService)

    const expressApi = new ApiExpress()
    expressApi.addMiddlewares(
        [
            JwtMiddleware.newInstance(authenticateJwtUsecase)
        ]
    )
    expressApi.addRoutes(
        [
            CreateTaskRoute.newInstance(createTaskUseCase),
            GetAllTaskRoute.newInstance(getAllTaskUsecase),
            GetTaskRoute.newInstance(getTaskUsecase),
            DeleteTaskRoute.newInstance(deleteTaskUsecase),
            UpdateTaskRoute.newInstance(updataTaskUsecase)
        ]
    )


    expressApi.start(port)
}

bootstrap(PORT)