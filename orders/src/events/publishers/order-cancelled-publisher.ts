import {
	Subjects,
	Publisher,
	OrderCancelledEvent,
} from '@babaliauskas-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
}
