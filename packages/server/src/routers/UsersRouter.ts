import { z } from 'zod';
import {
  createUserHandler,
  findUserHandler,
  searchUsersHandler
} from '@/handlers/UsersHandler';

export const UserResponse = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().optional(),
});

export const initUsersRouter = (t) => {
  return t.router({
    // List users
    search: t.procedure
      .output(z.object({
        users: UserResponse.array(),
      }))
      .query(searchUsersHandler),

    // Find specified user
    find: t.procedure
      .input(z.object({
        id: z.number()
      }))
      .output(UserResponse)
      .query(findUserHandler),

    // Create new user
    create: t.procedure
      .input(z.object({
        email: z.string(),
        name: z.string().optional(),
      }))
      .output(UserResponse)
      .mutation(createUserHandler),
  });
}
