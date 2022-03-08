import { JwtGuard } from './../auth/guards/jwt.guard';
import { ProductDocument } from './product.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  createProduct(@Body() product: ProductDocument) {
    return this.productService.create(product);
  }

  @Get()
  findAllProducts() {
    return this.productService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDocument) {
    return this.productService.updateOne(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteOne(id);
  }
}
