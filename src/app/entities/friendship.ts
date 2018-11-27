import { User } from './user';
import { Thread } from './thread';

export class Friendship {
  id: number;
  friend: User;
  threads: Thread[];
}
