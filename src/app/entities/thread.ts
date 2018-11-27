import { Message } from './message';

export class Thread {
  id: number;
  messages: Message[];
  topic: string;
  color: string;
  lastActivity: Message;
}
