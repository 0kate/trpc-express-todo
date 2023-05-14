import User from '../../entities/User';
import UsersAccessible from '../../repositories/UsersAccessible';

class FindUser {
  public static async call(accessible: UsersAccessible, id: number): Promise<User | undefined> {
    const user = await accessible.find(id);
    return user;
  }
}

export default FindUser;
