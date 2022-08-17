import {
	Subjects,
	Publisher,
	ExpirationCompleteEvent,
} from '@babaliauskas-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete;
}
