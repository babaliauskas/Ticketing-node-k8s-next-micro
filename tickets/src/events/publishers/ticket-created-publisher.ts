import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@babaliauskas-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
