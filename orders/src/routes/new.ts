import express, { Request, Response } from 'express';
import {
	BadRequestError,
	NotFoundError,
	OrderStatus,
	requireAuth,
	validateRequest,
} from '@babaliauskas-tickets/common';
import { body } from 'express-validator';
import { Order } from '../models/order.model';
import { Ticket } from '../models/ticket.model';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

// The best would be to store in ENV. Kubernetes
const EXPIRATION_WINDOW_SECONDS = 15 * 60; // 15 minutes

router.post(
	'/api/orders',
	requireAuth,
	[body('ticketId').not().isEmpty().withMessage('TicketID must be provided')],
	validateRequest,
	async (req: Request, res: Response) => {
		const { ticketId } = req.body;

		const ticket = await Ticket.findById(ticketId);
		if (!ticket) {
			throw new NotFoundError();
		}

		// isReserved custom func. ticket.model.ts
		const isReserved = await ticket.isReserved();
		if (isReserved) {
			throw new BadRequestError('Ticket is already reserved');
		}

		const expiration = new Date();
		expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

		const order = Order.build({
			userId: req.currentUser!.id,
			status: OrderStatus.Created,
			expiresAt: expiration,
			ticket,
		});

		await order.save();

		new OrderCreatedPublisher(natsWrapper.client).publish({
			id: order.id,
			status: order.status,
			version: order.version,
			userId: order.userId,
			expiresAt: order.expiresAt.toISOString(),
			ticket: {
				id: ticket.id,
				price: ticket.price,
			},
		});

		res.status(201).json(order);
	}
);

export { router as newOrderRouter };
