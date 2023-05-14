import { z } from "zod";
import {
  createTaskHandler,
  searchTasksHandler,
  updateTaskHandler,
} from "@/handlers/TasksHandler";

import { UserResponse } from './UsersRouter';

const TaskResponse = z.object({
  id: z.number(),
  title: z.string(),
  done: z.boolean(),
  user: UserResponse,
});

export const initTasksRouter = (t) => {
  return t.router({
    // Search tasks
    search: t.procedure
      .input(z.object({
        page: z.number().optional(),
        rows: z.number().optional(),
      }))
      .output(z.object({
        tasks: TaskResponse.array(),
      }))
      .query(searchTasksHandler),

    // Create new task
    create: t.procedure
      .input(z.object({
        title: z.string(),
        userId: z.number(),
      }))
      .output(TaskResponse)
      .mutation(createTaskHandler),

    // Update specified task
    update: t.procedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        done: z.boolean().optional(),
      }))
      .output(TaskResponse)
      .mutation(updateTaskHandler),
  });
};
