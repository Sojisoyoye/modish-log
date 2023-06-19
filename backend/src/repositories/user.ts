import { config } from "../config/database";
import { User } from "../entities";

export interface UserRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
}

export const createUser = async (dto: UserRequest): Promise<User> => {
  const userRepository = config.getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...dto,
  });
};

export const getUsers = async (): Promise<Array<User>> => {
  const userRepository = config.getRepository(User);
  return userRepository.find();
};

export const getUser = async (id: number): Promise<User | null> => {
  const userRepository = config.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });
  if (!user) return null;
  return user;
};

export const updateUser = async (
  userName: string,
  hashedPassword: string
): Promise<any> => {
  const userRepository = config.getRepository(User);
  const updatedUser = await userRepository.update(
    { userName },
    { password: hashedPassword }
  );

  return updatedUser.affected;
  // userRepository.update()
};

export const loginUser = async (
  userName: string,
  password: string
): Promise<any> => {
  const userRepository = config.getRepository(User);

  const user = await userRepository.findOneBy({ userName, password });
  return user;
};
