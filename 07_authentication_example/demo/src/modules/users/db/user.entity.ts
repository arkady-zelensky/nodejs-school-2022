import { RoleEntity } from "src/modules/permissions/db/role.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ContactEntity } from "../../contacts/db/contact.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "" })
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: false })
  twoFaEnabled: boolean;

  @Column()
  passwordHash: string;

  @OneToMany(() => ContactEntity, (c) => c.user)
  contacts: ContactEntity[];

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: "user_roles" })
  roles: RoleEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export enum UserRelations {
  ROLES = "roles",
  ROLES_PERMISSIONS = "roles.permissions",
}
