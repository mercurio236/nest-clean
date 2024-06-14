import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionCommentMapper } from "../mappers/prisma-question-comment-mapper";

@Injectable()
export class PrismaQuestionsCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!questionComment) {
      return null;
    }

    return PrismaQuestionCommentMapper.toDomain(questionComment);
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionsComments = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20, //quando itens eu quero
      skip: (page - 1) * 20, // quando eu quero pular
    });

    return questionsComments.map(PrismaQuestionCommentMapper.toDomain);
  }
  async create(question: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(question);
    await this.prisma.comment.create({
      data,
    });
  }

  async delete(question: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: question.id.toString(),
      },
    });
  }
}
