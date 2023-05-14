import Task from "../../entities/Task";
import TasksAccessible, { SearchTasksOptions } from "../../repositories/TasksAccessible";

class SearchTasks {
  public static async call(
    repository: TasksAccessible,
    options: SearchTasksOptions,
  ): Promise<Task[]> {
    const tasks = await repository.search(options);
    return tasks;
  }
}

export default SearchTasks;
