import { OrganizationEntity } from 'src/modules/organizations/db/organization.entity';
import { UserEntity } from 'src/modules/users/db/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AccessModes } from '../types/access-modes.enum';
import { ContactAccessEntity } from './contact-access.entity';
import { ContactTypeEntity } from './contact-type.entity';

@Entity('contacts')
export class ContactEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  organizationId: string | null;

  @Column('uuid', { nullable: true })
  userId: string | null;

  @Column('varchar')
  accessMode: AccessModes;

  @Column()
  type: string;

  @Column()
  value: string;

  @Column({ default: false })
  verified: boolean;

  @ManyToOne(() => OrganizationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId', referencedColumnName: 'id' })
  organization: OrganizationEntity | null;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity | null;

  @ManyToOne(() => ContactTypeEntity)
  @JoinColumn({ name: 'type', referencedColumnName: 'type' })
  typeRef: ContactTypeEntity;

  @OneToMany(() => ContactAccessEntity, (ca) => ca.contact)
  accesses: ContactAccessEntity[];
}
