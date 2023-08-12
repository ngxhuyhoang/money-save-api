import { BasedEntity } from '@common/based.entity';
import { TransactionEntity } from '@modules/transaction/entities/transaction.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity extends BasedEntity {
  @Column()
  name: string;

  @ManyToMany(() => TransactionEntity, (transaction) => transaction.categories)
  @JoinTable({ name: 'transactions_categories' })
  transactions: TransactionEntity[];
}
