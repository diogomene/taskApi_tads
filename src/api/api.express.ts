import express, { Express } from "express"
import { Route } from "./routes/route"
import { Api } from "./api"
import { log } from "console"
import {swaggerSpecs} from "./swagger/swagger"
import * as swaggerUi from "swagger-ui-express"

export class ApiExpress implements Api{
    private app: Express

    constructor(routes: Route[]){
        this.app = express()
        this.app.use(express.json())
        this.app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
        this.addRoutes(routes)        
    }

    private addRoutes(routes: Route[]){
        const router = express.Router()
        routes.forEach((route)=>{
            router.use(route.getRoute())
        })
        this.app.use("/api", router)
    }
    start(port: number): void {
        this.app.listen(port, ()=>{
            log(`API inicializada na porta ${port}`)
        })
    }
}