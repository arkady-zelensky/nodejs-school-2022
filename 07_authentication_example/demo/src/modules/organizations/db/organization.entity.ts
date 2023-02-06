import { ContactEntity } from "src/modules/contacts/db/contact.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { UserEntity } from "../../users/db/user.entity";
import { OrganizationStatuses } from "../types/organization-statuses.enum";
import { OrganizationTypes } from "../types/organization-types.enum";
import { OrganizationTypeEntity } from "./organization-type.entity";

@Entity("organizations")
export class OrganizationEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  type: OrganizationTypes;

  @Column()
  status: OrganizationStatuses;

  @Column({ default: "" })
  address: string;

  @Column({ default: "" })
  imagePath: string;

  @Column()
  createdBy: string;

  @OneToMany(() => ContactEntity, (c) => c.organization, {
    cascade: true,
  })
  contacts: ContactEntity[];

  @ManyToOne(() => OrganizationTypeEntity)
  @JoinColumn({ name: "type", referencedColumnName: "type" })
  typeRef: OrganizationTypeEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "createdBy", referencedColumnName: "id" })
  creator: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
