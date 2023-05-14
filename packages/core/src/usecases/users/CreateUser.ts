import User from "../../entities/User";
import UsersAccessible, { UserToCreate } from "../../repositories/UsersAccessible";

class CreateUser {
  public static async call(repository: UsersAccessible, user: UserToCreate): Promise<User> {
    const created = await repository.create(user);
    return created;
  }
}

export default CreateUser;
