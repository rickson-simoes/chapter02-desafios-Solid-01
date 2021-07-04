import { response } from "express";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string | any;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exists");
    }

    const { admin } = user;

    if (!admin) {
      throw new Error("User not allowed to do this");
    }

    return user;
  }
}

export { ShowUserProfileUseCase };
