import { Request, NextFunction, Response } from "express";
import { Middleware } from "../middlware";

export class JwtMiddleware implements Middleware{
    private constructor(){}
    public static newInstance() : JwtMiddleware{
        return new JwtMiddleware()
    }
    public getAction(): (request: Request, response: Response, next: NextFunction) => Promise<void> {
        return async (request, response, next) =>{
            const token = request.headers['token']
            if(token === undefined){
                response.status(401).json(
                    {
                        error: "token obrigatório em header de requisição"
                    }
                )
                return
            }
            next()
        }
    }
}