import { DictionaryPhraseEntity } from 'src/modules/dictionary/db/dictionary-phrase.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('contact_types')
export class ContactTypeEntity {
  @Column({ primary: true })
  type: string;

  @Column()
  nameId: string;

  @OneToOne(() => DictionaryPhraseEntity)
  @JoinColumn({ name: 'nameId', referencedColumnName: 'id' })
  name: DictionaryPhraseEntity;
}
