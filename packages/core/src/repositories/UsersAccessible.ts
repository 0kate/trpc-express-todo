import User from '../entities/User';

export type UserToCreate = {
  email: string;
  name?: string;
};

interface UsersAccessible {
  search(): Promise<User[]>;
  find(id: number): Promise<User | undefined>;
  create(user: UserToCreate): Promise<User>;
}

export default UsersAccessible;
