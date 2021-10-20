import axios from "axios";
import prismaClient from "../prisma"
import { sign } from "jsonwebtoken"
/**
 * receber o code - string
 * recuperar o acesse_token  no github
 * verificar se o usário existe no DB
 * ---- SIM - gera um tokenk
 * ------NAO - cria no DB, gera um token
 * retornar um token com as info do user
 */

interface IaccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        // pegando o o token atraves do code
        const { data: accessTokenResponse } = await axios.post<IaccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRETES,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        });


        //pegando os dados do usuário no github
        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        const { login, id, name, avatar_url } = response.data;

        // fazendo uma busca pelo usuario pelo id do github (github_id)
        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        });

        // verficando se o usuario existe e criando o novo usuario no nosso banco de dados
        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    name,
                    login,
                    avatar_url
                }
            });
        }

        // gerando o token do usuario
        const token = sign(
            {
                user: {
                    id: user.id,
                    name: user.name,
                    avatar_url: user.avatar_url
                }
            },
            process.env.JWT_SICRET
            ,
            {
                subject: user.id,
                expiresIn: "1d"
            }

        );
        return { token, user };
    }

}


export { AuthenticateUserService }