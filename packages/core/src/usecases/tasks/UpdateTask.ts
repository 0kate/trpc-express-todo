import Task from "../../entities/Task";
import TasksAccessible, { TaskToUpdate } from "../../repositories/TasksAccessible";

class UpdateTask {
  public static async call(repository: TasksAccessible, task: TaskToUpdate): Promise<Task> {
    const updated = await repository.update(task);
    return updated;
  }
}

export default UpdateTask;
