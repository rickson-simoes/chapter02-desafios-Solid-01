import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const findUserById = this.usersRepository.findById(user_id);

    if (!findUserById) {
      throw new Error("User does not exists");
    }

    const { admin } = findUserById;

    if (!admin) {
      throw new Error("User not allowed to do this");
    }

    const listAllUsers = this.usersRepository.list();

    return listAllUsers;
  }
}

export { ListAllUsersUseCase };
