import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  createTransactionFixture,
  incomeCategoryFixture,
  otherTransactionFixture,
  transactionFixture,
  updateTransactionFixture,
  userEntityFixture,
} from '../__fixtures__';

import { CommonService } from '../common/common.service';
import { CategoriesService } from '../categories/categories.service';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities';
import { ErrorCodes } from '@/common/interfaces';

describe('TransactionsService', () => {
  let service: TransactionsService;

  const mockTransactionRepository = {
    create: jest.fn(),
    findBy: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockCategoriesService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        CommonService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionRepository,
        },
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    service = app.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be successful create', async () => {
    jest
      .spyOn(mockCategoriesService, 'findOne')
      .mockResolvedValue(incomeCategoryFixture);

    jest
      .spyOn(mockTransactionRepository, 'create')
      .mockReturnValue(transactionFixture);

    await expect(
      service.create(createTransactionFixture, userEntityFixture),
    ).resolves.toEqual(transactionFixture);
  });

  it('should find all transactions', async () => {
    jest
      .spyOn(mockTransactionRepository, 'findBy')
      .mockResolvedValue([transactionFixture, otherTransactionFixture]);

    await expect(service.findAll(userEntityFixture)).resolves.toEqual([
      transactionFixture,
      otherTransactionFixture,
    ]);
  });

  it('should find one transaction', async () => {
    jest
      .spyOn(mockTransactionRepository, 'findOneBy')
      .mockResolvedValue(transactionFixture);

    await expect(
      service.findOne(transactionFixture.id, userEntityFixture),
    ).resolves.toEqual(transactionFixture);
  });

  it('should not find one transaction', async () => {
    jest.spyOn(mockTransactionRepository, 'findOneBy').mockResolvedValue(null);

    await expect(
      service.findOne(transactionFixture.id, userEntityFixture),
    ).rejects.toThrow(
      CommonService.getErrorMessage(ErrorCodes.TransactionNotFound),
    );
  });

  it('should update transaction', async () => {
    jest
      .spyOn(mockCategoriesService, 'findOne')
      .mockResolvedValue(incomeCategoryFixture);

    jest
      .spyOn(mockTransactionRepository, 'preload')
      .mockResolvedValue(transactionFixture);

    await expect(
      service.update(transactionFixture.id, updateTransactionFixture),
    ).resolves.toEqual(transactionFixture);
  });

  it('should not update transaction if transaction does not exist', async () => {
    jest
      .spyOn(mockCategoriesService, 'findOne')
      .mockResolvedValue(incomeCategoryFixture);

    jest.spyOn(mockTransactionRepository, 'preload').mockResolvedValue(null);

    await expect(
      service.update(transactionFixture.id, updateTransactionFixture),
    ).rejects.toThrow(
      CommonService.getErrorMessage(ErrorCodes.TransactionNotFound),
    );
  });

  it('should remove transaction', async () => {
    jest
      .spyOn(mockTransactionRepository, 'findOneBy')
      .mockResolvedValue(transactionFixture);

    await expect(
      service.remove(transactionFixture.id, userEntityFixture),
    ).resolves.toBeUndefined();
  });

  it('should not remove transaction if transaction does not exist', async () => {
    jest.spyOn(mockTransactionRepository, 'findOneBy').mockResolvedValue(null);

    await expect(
      service.remove(transactionFixture.id, userEntityFixture),
    ).rejects.toThrow(
      CommonService.getErrorMessage(ErrorCodes.TransactionNotFound),
    );
  });
});
