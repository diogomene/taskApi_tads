import express, { Request, Response, Router } from "express"

export type HttpMethod = "get" | "post" | "put" | "delete"

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    UPDATE: "put" as HttpMethod,
    DELETE: "delete" as HttpMethod
} as const

export abstract class Route{
    protected abstract getHandler(): (request: Request, response: Response) => Promise<void>
    protected abstract getPath(): string
    protected abstract getMethod(): HttpMethod
    getRoute():Router{
        const route = express.Router() 
        route[this.getMethod()](this.getPath(), this.getHandler())
        return route
    }
    
}