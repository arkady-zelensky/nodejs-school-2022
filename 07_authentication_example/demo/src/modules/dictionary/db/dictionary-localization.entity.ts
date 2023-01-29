import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { DictionaryPhraseEntity } from './dictionary-phrase.entity';
import { LanguageEntity } from './language.entity';

@Entity('dictionary_localizations')
@Index('idx_localizations_text', ['text'])
export class DictionaryLocalizationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  text: string;

  @Column()
  language: string;

  @Column()
  phraseId: string;

  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: 'language', referencedColumnName: 'code' })
  languageRef: LanguageEntity;

  @ManyToOne(() => DictionaryPhraseEntity)
  @JoinColumn({ name: 'phraseId', referencedColumnName: 'id' })
  phrase: DictionaryPhraseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
