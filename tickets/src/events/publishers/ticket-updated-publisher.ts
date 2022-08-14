import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@babaliauskas-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
