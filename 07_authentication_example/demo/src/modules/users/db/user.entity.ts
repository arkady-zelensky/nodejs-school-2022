import { PermissionEntity } from "src/modules/permissions/db/permission.entity";
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

  @Column()
  passwordHash: string;

  @OneToMany(() => ContactEntity, (c) => c.user)
  contacts: ContactEntity[];

  @ManyToMany(() => PermissionEntity)
  @JoinTable({ name: "user_permissions" })
  permissions: PermissionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export enum UserRelations {
  PERMISSIONS = "permissions",
}
