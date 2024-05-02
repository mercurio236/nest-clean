import { Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor() {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    return "ok";
  }
}
