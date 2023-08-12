import { BasedEntity } from '@common/based.entity';
import { ProfileEntity } from '@modules/profile/entities/profile.entity';
import { TransactionEntity } from '@modules/transaction/entities/transaction.entity';
import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'account' })
export class AccountEntity extends BasedEntity {
  @Column()
  @Index()
  email: string;

  @Column()
  password: string;

  @Column()
  @Index()
  refreshToken: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.account)
  profile: ProfileEntity;

  @OneToMany(() => TransactionEntity, (transactions) => transactions.account)
  transactions: TransactionEntity[];
}
