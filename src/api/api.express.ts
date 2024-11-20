import express, { Express } from "express"
import { Route } from "./routes/route"
import { Api } from "./api"
import { log } from "console"
export class ApiExpress implements Api{
    private app: Express

    constructor(routes: Route[]){
        this.app = express()
        this.app.use(express.json())
        this.addRoutes(routes)
    }

    private addRoutes(routes: Route[]){
        routes.forEach((route)=>{
            this.app.use(route.getRoute())
        })
    }
    start(port: number): void {
        this.app.listen(port, ()=>{
            log(`API inicializada na porta ${port}`)
        })
    }
}