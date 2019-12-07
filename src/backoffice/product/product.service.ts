import { Injectable } from '@nestjs/common'
import { ProductRepository } from './product.repository'
import { IProduct } from './product.model'
@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async addProduct({name, image, price}) {
    const { _id } = await this.repository.insert({name, image, price} as IProduct)
    return _id as string
  }
}
