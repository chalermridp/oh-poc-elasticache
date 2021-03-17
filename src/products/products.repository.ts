import { EntityRepository, Repository } from 'typeorm';
import { Product } from './products.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async getById(id: number): Promise<Product[]> {
        const query = this.createQueryBuilder('product');
        query.andWhere('product.id = :id', { id });
        return await query.getMany();
    }
}
