import {
	Publisher,
	OrderCreatedEvent,
	Subjects,
} from '@babaliauskas-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
}
