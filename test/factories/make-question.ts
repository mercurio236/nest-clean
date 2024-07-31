import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionsProps,
} from "@/domain/forum/enterprise/entities/question";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/databse/prisma/prisma.service";
import { PrismaQuestionMapper } from "@/infra/databse/prisma/mappers/prisma-question-mapper";

export function makeQuestion(
  override: Partial<QuestionsProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(
    data: Partial<QuestionsProps> = {},
  ): Promise<Question> {
    const question = makeQuestion(data);

    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPrisma(question),
    });

    return question;
  }
}
