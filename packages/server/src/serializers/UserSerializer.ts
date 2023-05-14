import User from '@trpc-express-todo/core/src/entities/User';

import ApplicationSerializer from './ApplicationSerializer';

class UserSerializer extends ApplicationSerializer {
  public static render(user: User): any {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}

export default UserSerializer;
