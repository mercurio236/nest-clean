import { makeQuestion } from "test/factories/make-question";

import { CommentOnQuestionUseCase } from "@/domain/forum/application/use-cases/comment-on-question";
import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { InMemoryQuestionCommentRepository } from "test/respositories/in-memory-question-comments-repository";
import { InMemoryQuestionAttachmentRepository } from "test/respositories/in-memory-question-attachment-respository";

let inMemoryQuestionAttachmentRepository =
  new InMemoryQuestionAttachmentRepository();
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    );

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    );
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Comentário teste",
    });

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      "Comentário teste",
    );
  });
});
