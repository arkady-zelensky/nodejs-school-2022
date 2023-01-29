import { EntityRepository, Repository } from 'typeorm';
import { ContactTypeEntity } from './contact-type.entity';

@EntityRepository(ContactTypeEntity)
export class ContactTypesRepository extends Repository<ContactTypeEntity> {
  async findContactTypes(language: string) {
    return this.createQueryBuilder('ct')
      .innerJoinAndSelect('ct.name', 'ctn')
      .innerJoinAndSelect('ctn.localizations', 'ctnl')
      .where('ctnl.language = :language', { language })
      .getMany();
  }
}
