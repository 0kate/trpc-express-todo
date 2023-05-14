import { User as UserDao } from '@prisma/client';
import TasksAccessible, { SearchTasksOptions, TaskToCreate, TaskToUpdate } from '@trpc-express-todo/core/src/repositories/TasksAccessible';
import Task, { TaskBuilder } from '@trpc-express-todo/core/src/entities/Task';
import User, { UserBuilder } from '@trpc-express-todo/core/src/entities/User';

import ApplicationRepository from "./ApplicationRepository";

class TasksRepository extends ApplicationRepository implements TasksAccessible {
  public async search(options: SearchTasksOptions): Promise<Task[]> {
    const tasks = await TasksRepository.client.task.findMany({
      include: { user: true },
      skip: (options.page - 1) * options.rows,
      take: options.rows,
    });

    return tasks.map((task) => {
      const builder = new TaskBuilder();
      builder.setId(task.id);
      builder.setTitle(task.title);
      builder.setDone(task.done);
      builder.setUser(this.buildUser(task.user));

      return builder.build();
    });
  }

  public async create(task: TaskToCreate): Promise<Task> {
    const newTask = await TasksRepository.client.task.create({
      data: task,
      include: { user: true }
    });

    const builder = new TaskBuilder();
    builder.setId(newTask.id);
    builder.setTitle(newTask.title);
    builder.setDone(newTask.done);
    builder.setUser(this.buildUser(newTask.user));

    return builder.build();
  }

  public async update(task: TaskToUpdate): Promise<Task> {
    const updatedTask = await TasksRepository.client.task.update({
      where: { id: task.id },
      data: task,
      include: { user: true },
    });

    const builder = new TaskBuilder();
    builder.setId(updatedTask.id);
    builder.setTitle(updatedTask.title);
    builder.setDone(updatedTask.done);
    builder.setUser(this.buildUser(updatedTask.user));

    return builder.build();
  }

  private buildUser(taskUser: UserDao): User {
    const builder = new UserBuilder();
    builder.setId(taskUser.id);
    builder.setEmail(taskUser.email);
    builder.setName(taskUser.name);

    return builder.build();
  }
}

export default TasksRepository;
