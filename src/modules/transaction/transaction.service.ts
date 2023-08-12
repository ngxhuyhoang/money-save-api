import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { AuthUserDto } from '@decorators/auth-user.decorator';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly _transactionRepository: Repository<TransactionEntity>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, authUser: AuthUserDto) {
    try {
      const result = await this._transactionRepository.save({
        ...createTransactionDto,
        account: { id: authUser.accountId },
        type: createTransactionDto.type,
        categories: createTransactionDto.categories,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(authUser: AuthUserDto) {
    try {
      const result = await this._transactionRepository.find({
        where: {
          account: { id: authUser.accountId },
        },
        relations: ['categories', 'account'],
      });
      return result.map((x) => ({ ...x, account: undefined }));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number, authUser: AuthUserDto) {
    try {
      const result = await this._transactionRepository.findOne({
        where: {
          account: { id: authUser.accountId },
        },
        relations: ['categories', 'account'],
      });
      delete result.account;
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      await this._transactionRepository.update(id, updateTransactionDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this._transactionRepository.softDelete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
