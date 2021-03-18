import { Body, CacheInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ProductsCreateDto } from './dto/products.create.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('v1/products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    getAll() {
        return this.productsService.getAll();
    }

    @Post()
    async create(@Body() createDto: ProductsCreateDto): Promise<Product> {
        return await this.productsService.create(createDto);
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.productsService.getById(id);
    }
}
