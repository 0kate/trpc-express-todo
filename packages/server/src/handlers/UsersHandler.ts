import CreateUser from '@trpc-express-todo/core/src/usecases/users/CreateUser';
import FindUser from '@trpc-express-todo/core/src/usecases/users/FindUser';
import SearchUsers from '@trpc-express-todo/core/src/usecases/users/SearchUsers';
import { TRPCError } from '@trpc/server';
import UsersRepository from '../repositories/UsersRepository';
import UserSerializer from '../serializers/UserSerializer';

export const searchUsersHandler = async () => {
  const users = await SearchUsers.call(new UsersRepository());

  return {
    users: users.map((user) => UserSerializer.render(user)),
  }
};

export const findUserHandler = async ({ input }) => {
  const user = await FindUser.call(new UsersRepository(), input.id);

  if (!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `User ID ${input.id} does not exist.`,
    });
  }

  return UserSerializer.render(user);
};

export const createUserHandler = async ({ input }) => {
  const user = await CreateUser.call(new UsersRepository(), {
    email: input.email,
    name: input.name,
  });

  return UserSerializer.render(user);
};
