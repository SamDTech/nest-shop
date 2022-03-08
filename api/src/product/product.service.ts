import { ProductDocument } from './product.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(product: ProductDocument): Promise<ProductDocument> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return await this.productModel.find({});
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async updateOne(
    id: string,
    product: ProductDocument,
  ): Promise<ProductDocument> {
    const findProduct = await this.findOne(id);

    if (!findProduct) {
      throw new NotFoundException('product not found');
    }
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async deleteOne(id: string): Promise<ProductDocument> {
    const findProduct = await this.findOne(id);

    if (!findProduct) {
      throw new NotFoundException('product not found');
    }
    return this.productModel.findByIdAndDelete(id);
  }
}
