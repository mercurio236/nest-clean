import { makeAnswer } from "test/factories/make-answer";

import { CommentOnAnswerUseCase } from "@/domain/forum/application/use-cases/comment-on-answer";
import { InMemoryAnswerRepository } from "test/respositories/in-memory-answers-repository";
import { InMemoryAnswerCommentRepository } from "test/respositories/in-memory-answer-comments-repository";
import { InMemoryAnswerAttachmentRepository } from "test/respositories/in-memory-answer-attachements-repository";

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository;
let inMemoryAnswerAttachmentRepository =
  new InMemoryAnswerAttachmentRepository();
let sut: CommentOnAnswerUseCase;

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    );
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Comentário teste",
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "Comentário teste",
    );
  });
});
