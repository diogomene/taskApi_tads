import { JwtDao } from "../../dao/JwtDao";
import { Usecase } from "../usecase";

type AuthenticateJwtInputDto ={
    token: string
}
type AuthenticateJwtOutputDto = boolean

export class AuthenticateJwtUsecase implements Usecase<AuthenticateJwtInputDto, AuthenticateJwtOutputDto> {
    constructor(private readonly jwtDao : JwtDao){}

    execute(input: AuthenticateJwtInputDto): Promise<boolean> {
        const jwtToken = input.token
        return this.jwtDao.authenticate(jwtToken)
    }
}
