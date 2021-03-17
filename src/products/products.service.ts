import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
    ) { }

    getAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    getById(id: number): Promise<Product[]> {
        return this.productRepository.getById(id);
    }
}
