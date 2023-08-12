import { BasedEntity } from '@common/based.entity';
import { TransactionType } from '@constants/enum';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { CategoryEntity } from '@modules/category/entities/category.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity extends BasedEntity {
  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  @JoinColumn()
  account: AccountEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.transactions)
  @JoinTable({ name: 'transactions_categories' })
  categories: CategoryEntity[];
}
