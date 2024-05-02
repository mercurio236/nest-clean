import { Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

/* const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>; */
@Controller("/sessions")
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  //@HttpCode(201)
  //@UsePipes(new ZodValidationPipe(createAccountBodySchema)) //agora está validando
  async handle() {
    const token = this.jwt.sign({ sub: "user-id" });

    return token;
  }
}
