import { NextFunction, Request, Response } from "express";

export interface Middleware{
    getAction(): (request: Request, response: Response, next: NextFunction) => Promise<void>
}