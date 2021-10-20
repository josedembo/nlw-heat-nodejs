import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IpayLoad {
    sub: string;
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization;

    if (!authToken) {
        response.status(401).json(
            {
                errorCode: "Token.Invalid"
            }
        )
    }

    //  Bear e2qwiieiti8384i1941u9undknq 
    const [, token] = authToken.split(" ");

    // vericando se o token do usuario é valido 
    try {
        const { sub } = verify(token, process.env.JWT_SICRET) as IpayLoad;

        request.user_id = sub;

        return next();

    } catch (error) {
        return response.status(401).json(
            {
                error: "token.expireted"
            }
        )
    };



}