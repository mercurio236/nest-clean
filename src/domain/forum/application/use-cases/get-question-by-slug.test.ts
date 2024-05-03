import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { InMemoryQuestionAttachmentRepository } from "test/respositories/in-memory-question-attachment-respository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
const inMemoryQuestionAttachmentRepository =
  new InMemoryQuestionAttachmentRepository();
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);

    //system under test
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "example-question",
    });

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    });
  });
});
