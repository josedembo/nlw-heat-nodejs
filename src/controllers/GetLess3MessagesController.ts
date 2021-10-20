import { Request, Response } from "express";
import { GetLess3MessagesService } from "../service/GetLess3MessagesService";




class GetLess3MessagesController {
    async handle(request: Request, response: Response) {

        const service = new GetLess3MessagesService();

        const result = await service.excute();

        return response.json(result);
    }
}

export { GetLess3MessagesController }