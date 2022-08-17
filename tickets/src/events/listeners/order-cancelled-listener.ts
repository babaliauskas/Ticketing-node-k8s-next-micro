import {
	Listener,
	OrderCancelledEvent,
	Subjects,
} from '@babaliauskas-tickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket.model';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { queueGroupName } from './QueueGroupName';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
		const ticket = await Ticket.findById(data.ticket.id);

		if (!ticket) {
			throw new Error('Ticket not found');
		}

		ticket.set({ orderId: undefined });
		await ticket.save();

		new TicketUpdatedPublisher(this.client).publish({
			id: ticket.id,
			title: ticket.title,
			version: ticket.version,
			price: ticket.price,
			userId: ticket.userId,
			orderId: ticket.orderId,
		});

		msg.ack();
	}
}
