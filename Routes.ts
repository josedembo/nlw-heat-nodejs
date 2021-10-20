import { Router } from "express";
import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController";
import { CreateMessageController } from "./src/controllers/CreateMessageController";
import { GetLess3MessagesController } from "./src/controllers/GetLess3MessagesController";
import { ProfileUserController } from "./src/controllers/ProfileUserController";
import { ensureAuthenticated } from "./src/middleware/ensureAuthenticated";


const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

router.get("/messages/lest3", new GetLess3MessagesController().handle);

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router }