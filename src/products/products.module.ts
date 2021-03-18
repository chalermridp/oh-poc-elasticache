import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductRepository } from './products.repository';
import { ProductsService } from './products.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    // CacheModule.register({
    //   store: redisStore,
    //   host: process.env.REDIS_HOST || 'localhost',
    //   port: process.env.REDIS_PORT || 6379,
    //   ttl: 300
    // }),
    TypeOrmModule.forFeature([ProductRepository])
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService]
})
export class ProductsModule { }
