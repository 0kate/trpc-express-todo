import Task from "../entities/Task";

export type SearchTasksOptions = {
  page: number;
  rows: number;
};

export type TaskToCreate = {
  title: string;
  done: boolean;
  userId: number;
};

export type TaskToUpdate = {
  id: number;
  title?: string;
  done?: boolean;
};

interface TasksAccessible {
  search(options: SearchTasksOptions): Promise<Task[]>;
  create(task: TaskToCreate): Promise<Task>;
  update(task: TaskToUpdate): Promise<Task>;
}

export default TasksAccessible;
