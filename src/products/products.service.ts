import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsCreateDto } from './dto/products.create.dto';
import { Product } from './products.entity';
import { ProductRepository } from './products.repository';
import * as cacheManager from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class ProductsService {
    private redisCache = cacheManager.caching({
        store: redisStore,
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        ttl: 300
    });

    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
    ) { }

    getAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async getById(id: number): Promise<Product[]> {
        const cachedKey = `product_${id.toString()}`
        const cached = await this.redisCache.get<Promise<Product[]>>(cachedKey);
        if (cached != null) {
            return cached;
        }
        const product = await this.productRepository.getById(id);
        this.redisCache.set(cachedKey, product);
        return product;
    }

    async create(createDto: ProductsCreateDto): Promise<Product> {
        const entity = this.transformCreateDtoToEntity(createDto);
        const result: Product = await this.productRepository.save(entity);

        const cacheKey = `product_${result.id.toString()}`
        this.redisCache.set(cacheKey, result);
        return result;
    }

    transformCreateDtoToEntity(createDto: ProductsCreateDto): Product {
        const { name, description, created_by } = createDto;
        const entity = new Product();
        entity.name = name;
        entity.description = description;
        entity.created_by = created_by;
        return entity;
    }
}
