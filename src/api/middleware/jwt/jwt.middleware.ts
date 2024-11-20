import { Request, NextFunction, Response } from "express";
import { Middleware } from "../middlware";
import { AuthenticateJwtUsecase } from "../../../usecases/jwt/jwt.usecase";

export class JwtMiddleware implements Middleware{
    private constructor(private readonly authenticateJwtUsecase : AuthenticateJwtUsecase){}
    public static newInstance(authenticateJwtUsecase : AuthenticateJwtUsecase) : JwtMiddleware{
        return new JwtMiddleware(authenticateJwtUsecase)
    }
    public getAction(): (request: Request, response: Response, next: NextFunction) => Promise<void> {
        return async (request, response, next) =>{
            const token = request.headers['token'] as string | undefined;
            if(token === undefined){
                response.status(401).json(
                    {
                        error: "token obrigatório em header de requisição"
                    }
                )
                return
            }
            const isTokenValide = this.authenticateJwtUsecase.execute(
                {
                    token: token
                }
            )
            if(!isTokenValide){
                response.status(401).json(
                    {
                        error: "token inválido"
                    }
                )
                return
            }
            next()
        }
    }
}