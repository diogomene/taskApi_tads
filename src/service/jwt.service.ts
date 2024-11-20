import { JwtDao } from "../dao/JwtDao";

export class JwtService implements JwtDao{
    async authenticate(token: string): Promise<boolean> {
        if(token){
            return true;
        }
        return false
    }

}