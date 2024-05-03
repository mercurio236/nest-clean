import { InMemoryNotificationsRepository } from "test/respositories/in-memory-notification-repository";
import { SendNotificationUseCase } from "./send-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("Send Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);

    //system under test
  });

  it("should be able to send a notification", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "Nova notificação",
      content: "Conteudo da notificação",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    );
  });
});
