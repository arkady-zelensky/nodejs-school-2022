import { OrganizationEntity } from 'src/modules/organizations/db/organization.entity';
import { UserEntity } from 'src/modules/users/db/user.entity';
import { EntityRepository, In, Not, Repository } from 'typeorm';
import { ContactEntity } from './contact.entity';

@EntityRepository(ContactEntity)
export class ContactsRepository extends Repository<ContactEntity> {
  async removeMissingContacts(
    entity: OrganizationEntity | UserEntity,
    relationField: 'organizationId' | 'userId',
  ) {
    if (!entity.contacts.length) {
      await this.delete({ [relationField]: entity.id });
    }

    await this.delete({
      [relationField]: entity.id,
      id: Not(In(entity.contacts.map((c) => c.id))),
    });
  }

  async removeMissingContactsByIds(
    relationId: string,
    relationField: 'organizationId' | 'userId',
    ids: string[],
  ) {
    if (!ids.length) {
      await this.delete({ [relationField]: relationId });
    }

    await this.delete({ [relationField]: relationId, id: Not(In(ids)) });
  }
}
