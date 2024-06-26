import { FastifyReply, FastifyRequest } from "fastify";
import { MakeLuckyUser } from "../../../useCases/factories/MakeLuckyUser";


export async function LuckyUserController(request: FastifyRequest, response: FastifyReply ) {



  const luckyToken = request.cookies.luckyToken;

  if(luckyToken) { 
    const luckyTokenBoolean = luckyToken == "true";

    return response.status(200).send({lucky: luckyTokenBoolean});
  }



  const luckyUserUseCase = MakeLuckyUser();
  const isLucky = await luckyUserUseCase.execute();

  const isLuckyString = isLucky.lucky.toString();

  return response
  .setCookie("luckyToken", isLuckyString, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  .status(200)
  .send(isLucky);

}