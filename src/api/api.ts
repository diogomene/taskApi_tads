import { Middleware } from "./middleware/middlware"
import { Route } from "./routes/route"

export interface Api{
    addMiddlewares(middlwares : Middleware[]) : void
    addRoutes(routes: Route[]) : void
    start(port: number) : void
}