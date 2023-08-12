import { BasedEntity } from '@common/based.entity';
import { TransactionType } from '@constants/enum';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity extends BasedEntity {
  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  @JoinColumn()
  account: AccountEntity;
}
