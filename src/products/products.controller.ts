import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('v1/products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    getAll() {
        return this.productsService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.productsService.getById(id);
    }
}
