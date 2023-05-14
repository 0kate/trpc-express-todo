import User from '../../entities/User';
import UsersAccessible from '../../repositories/UsersAccessible';

class SearchUsers {
  public static async call(accessible: UsersAccessible): Promise<User[]> {
    const users = await accessible.search();
    return users;
  }
}

export default SearchUsers;
