import CreateTask from '@trpc-express-todo/core/src/usecases/tasks/CreateTask';
import SearchTasks from '@trpc-express-todo/core/src/usecases/tasks/SearchTasks';
import UpdateTask from '@trpc-express-todo/core/src/usecases/tasks/UpdateTask';
import TasksRepository from '@/repositories/TasksRepository';
import TaskSerializer from '@/serializers/TaskSerializer';

export const searchTasksHandler = async ({ input }) => {
  const tasks = await SearchTasks.call(new TasksRepository(), {
    page: input.page || 1,
    rows: input.rows || 10,
  });

  return {
    tasks: tasks.map((task) => TaskSerializer.render(task)),
  };
};

export const createTaskHandler = async ({ input }) => {
  const task = await CreateTask.call(new TasksRepository(), {
    title: input.title,
    done: false,
    userId: input.userId,
  });

  return TaskSerializer.render(task);
};

export const updateTaskHandler = async ({ input }) => {
  const task = await UpdateTask.call(new TasksRepository(), {
    id: input.id,
    title: input.title,
    done: input.done,
  });

  return TaskSerializer.render(task);
};
