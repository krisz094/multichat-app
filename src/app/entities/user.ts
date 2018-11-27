import { Friendship } from './friendship';

export class User {
  id: number;
  nickname: string;
  email: string;
  friends: Friendship[];
}
