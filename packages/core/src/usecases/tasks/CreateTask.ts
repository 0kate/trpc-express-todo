import Task from '../../entities/Task';
import TaskAccessible, { TaskToCreate } from '../../repositories/TasksAccessible';

class CreateTask {
  public static async call(repository: TaskAccessible, task: TaskToCreate): Promise<Task> {
    const created = await repository.create(task);
    return created;
  }
}

export default CreateTask;
