import { getRepository } from 'some-orm';
import { UserEntity } from 'user.entity';

export const listUsers = async () => {
  return getRepository(UserEntity).find();
};

export const findUserById = async (id: number) => {
  return getRepository(UserEntity).findOne(id);
};

export const createUser = async (data: UserEntity) => {
  await checkIfUserAlreadyExists(data.email);

  return getRepository(UserEntity).save(data);
};

export const updateUser = async (id: number, data: UserEntity) => {
  await checkIfUserAlreadyExists(data.email);

  return getRepository(UserEntity).update({ id }, data);
};

export const deleteUser = async (id: number) => {
  return getRepository(UserEntity).delete(id);
};

export const checkIfUserAlreadyExists = async (email: string) => {
  const existingUser = await getRepository(UserEntity).findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error('User already exists!');
  }
};
