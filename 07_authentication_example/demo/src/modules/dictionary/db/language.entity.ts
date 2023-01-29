import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('languages')
export class LanguageEntity {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;
}
