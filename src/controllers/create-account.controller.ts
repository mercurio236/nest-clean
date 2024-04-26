import { ConflictException, UsePipes } from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
import { string, z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validations-pipe';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema)) //agora está validando
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException('User with same e-mail address exists ');
    }

    const hanshPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hanshPassword,
      },
    });
  }
}
