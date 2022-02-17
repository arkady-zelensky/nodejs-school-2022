import { getRepository } from 'some-orm';
import { BookEntity } from "book.entity";
import { BaseService } from "./base.service";

export class BookService extends BaseService<BookEntity> {
  constructor() {
    super();

    this.repository = getRepository(BookEntity);
  }
}
