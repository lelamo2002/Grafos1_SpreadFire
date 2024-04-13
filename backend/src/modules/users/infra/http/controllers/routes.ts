import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { CreateUserController } from "./CreateUserController";
import { GenerateUserConnectionsTreeController } from "./GenerateUserConnectionsTreeController";
import { AuthenticateUserController } from "./AuthenticateUserController";
import verifyJWT from "../../../../../shared/middlewares/VerifyJWT";
import { GetUserController } from "./GetUserController";
import { GetUsersCountController } from "./GetUsersCountController";
import { AddFriendController } from "./AddFriendController";


export async function userRoutes(app: FastifyInstance) {

  app.post("/create", CreateUserController);

  app.post("/authenticate", AuthenticateUserController);
  app.get("/count", GetUsersCountController);

  app.register(authenticatedRoutes);
  
}

const authenticatedRoutes: FastifyPluginCallback = (app, _, done) => {
  app.addHook("onRequest", verifyJWT);
  app.get("/generate-tree/:id", GenerateUserConnectionsTreeController);

  app.get("/check-auth", GetUserController);
  app.post("/addFriend", AddFriendController);

  done();
}