import { Request, Response } from "express";
import { CreateMessageService } from "../service/CreateMessageService";




class CreateMessageController {
    async handle(request: Request, response: Response) {
        const { message } = request.body;
        const { user_id } = request;

        const service = new CreateMessageService();

        const result = await service.excute(message, user_id);

        return response.json(result);
        // createMessage.excute(message, user_id)
    }
}

export { CreateMessageController }