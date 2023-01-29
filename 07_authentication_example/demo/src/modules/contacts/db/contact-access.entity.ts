import { OrganizationEntity } from 'src/modules/organizations/db/organization.entity';
import { UserEntity } from 'src/modules/users/db/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessTypes } from '../types/access-types.enum';
import { ContactEntity } from './contact.entity';

@Entity('contact_accesses')
export class ContactAccessEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  contactId: string;

  @Column('uuid', { nullable: true })
  organizationId: string | null;

  @Column('uuid', { nullable: true })
  userId: string | null;

  @Column()
  type: AccessTypes;

  @ManyToOne(() => ContactEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contactId', referencedColumnName: 'id' })
  contact: ContactEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity | null;

  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: 'organizationId', referencedColumnName: 'id' })
  organization: OrganizationEntity | null;
}
