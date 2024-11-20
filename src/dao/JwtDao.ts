export interface JwtDao{
    authenticate(token:string) : Promise<boolean>
}