import { getRepository } from 'some-orm';
import { BookEntity } from 'book.entity';

export const listBooks = async (): Promise<BookEntity[]> => {
  return getRepository(BookEntity).find();
};

export const findBookById = async (id: number): Promise<BookEntity> => {
  return getRepository(BookEntity).findOne(id);
};

export const createBook = async (data: BookEntity): Promise<BookEntity> => {
  return getRepository(BookEntity).save(data);
};

export const updateBook = async (id: number, data: BookEntity): Promise<BookEntity> => {
  return getRepository(BookEntity).update({ id }, data);
};

export const deleteBook = async (id: number): Promise<void> => {
  return getRepository(BookEntity).delete(id);
};
