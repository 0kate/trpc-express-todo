import { initTasksRouter } from './TasksRouter';
import { initUsersRouter } from './UsersRouter';

export const initAppRouter = (t) => {
  return t.router({
    tasks: initTasksRouter(t),
    users: initUsersRouter(t),
  });
};
