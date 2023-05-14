import Task from '@trpc-express-todo/core/src/entities/Task';

import ApplicationSerializer from "./ApplicationSerializer";
import UserSerializer from './UserSerializer';

class TaskSerializer extends ApplicationSerializer {
  public static render(task: Task): any {
    return {
      id: task.id,
      title: task.title,
      done: task.done,
      user: UserSerializer.render(task.user),
    };
  }
}

export default TaskSerializer;
