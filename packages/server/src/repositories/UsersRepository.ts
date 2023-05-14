import User, { UserBuilder } from '@trpc-express-todo/core/src/entities/User';
import UsersAccessible, { UserToCreate } from '@trpc-express-todo/core/src/repositories/UsersAccessible';

import ApplicationRepository from './ApplicationRepository';

class UsersRepository extends ApplicationRepository implements UsersAccessible {
  public async search(): Promise<User[]> {
    const users = await UsersRepository.client.user.findMany();

    return users.map((user) => {
      const builder = new UserBuilder();
      builder.setId(user.id);
      builder.setEmail(user.email);
      builder.setName(user.name);

      return builder.build();
    });
  }

  public async find(id: number): Promise<User | undefined> {
    const user = await UsersRepository.client.user.findUnique({
      where: { id },
    });

    if (!user)
      return undefined;

    const builder = new UserBuilder();
    builder.setId(user.id);
    builder.setEmail(user.email);
    builder.setName(user.name);

    return builder.build();
  }

  public async create(user: UserToCreate): Promise<User> {
    const newUser = await UsersRepository.client.user.create({ data: user });

    const builder = new UserBuilder();
    builder.setId(newUser.id);
    builder.setEmail(newUser.email);
    builder.setName(newUser.name);

    return builder.build();
  }
}

export default UsersRepository;
