import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DictionaryLocalizationEntity } from './dictionary-localization.entity';

@Entity('dictionary_phrases')
export class DictionaryPhraseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => DictionaryLocalizationEntity, (dl) => dl.phrase)
  localizations: DictionaryLocalizationEntity[];
}
