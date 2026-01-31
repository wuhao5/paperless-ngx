/**
 * Base controller with common CRUD operations
 */

import { Context } from 'koa';
import { Repository, DeepPartial, ObjectLiteral } from 'typeorm';
import { AppDataSource } from '../config/database';
import { NotFoundError, BadRequestError, ValidationError } from '../middleware/errorHandler';
import { validate, ValidationError as ClassValidatorError } from 'class-validator';

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  all: number[];
  results: T[];
}

export interface EntityWithId extends ObjectLiteral {
  id: number;
}

export abstract class BaseController<T extends EntityWithId> {
  protected abstract entityClass: new () => T;
  protected abstract entityName: string;

  protected getRepository(): Repository<T> {
    return AppDataSource.getRepository(this.entityClass);
  }

  protected getPaginationOptions(ctx: Context): PaginationOptions {
    const page = Math.max(1, parseInt(ctx.query.page as string) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(ctx.query.page_size as string) || 25));
    return { page, pageSize };
  }

  protected async validateEntity(entity: T): Promise<void> {
    const errors = await validate(entity as object);
    if (errors.length > 0) {
      const validationErrors = errors.map((error: ClassValidatorError) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      throw new ValidationError('Validation failed', validationErrors);
    }
  }

  async list(ctx: Context): Promise<void> {
    const { page, pageSize } = this.getPaginationOptions(ctx);
    const skip = (page - 1) * pageSize;

    const repository = this.getRepository();
    const [results, count] = await repository.findAndCount({
      skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);
    const baseUrl = `${ctx.origin}${ctx.path}`;

    ctx.body = {
      count,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}&page_size=${pageSize}` : null,
      previous: page > 1 ? `${baseUrl}?page=${page - 1}&page_size=${pageSize}` : null,
      all: results.map((r) => r.id),
      results,
    };
  }

  async get(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    if (isNaN(id)) {
      throw new BadRequestError('Invalid ID');
    }

    const repository = this.getRepository();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entity = await repository.findOne({
      where: { id } as any,
    });

    if (!entity) {
      throw new NotFoundError(`${this.entityName} not found`);
    }

    ctx.body = entity;
  }

  async create(ctx: Context): Promise<void> {
    const repository = this.getRepository();
    const entity = repository.create(ctx.request.body as DeepPartial<T>);
    
    await this.validateEntity(entity);
    
    const saved = await repository.save(entity);
    ctx.status = 201;
    ctx.body = saved;
  }

  async update(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    if (isNaN(id)) {
      throw new BadRequestError('Invalid ID');
    }

    const repository = this.getRepository();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await repository.findOne({
      where: { id } as any,
    });

    if (!existing) {
      throw new NotFoundError(`${this.entityName} not found`);
    }

    const updated = repository.merge(existing, ctx.request.body as DeepPartial<T>);
    await this.validateEntity(updated);
    
    const saved = await repository.save(updated);
    ctx.body = saved;
  }

  async partialUpdate(ctx: Context): Promise<void> {
    // Same as update for now
    await this.update(ctx);
  }

  async delete(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    if (isNaN(id)) {
      throw new BadRequestError('Invalid ID');
    }

    const repository = this.getRepository();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await repository.findOne({
      where: { id } as any,
    });

    if (!existing) {
      throw new NotFoundError(`${this.entityName} not found`);
    }

    await repository.remove(existing);
    ctx.status = 204;
  }
}

export default BaseController;
