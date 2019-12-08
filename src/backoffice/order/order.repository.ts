import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IOrder } from './order.model'
import { modelName } from './order.model'

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(modelName)
    private readonly orderModel: Model<IOrder>,
  ) {}

  async findAll() {
    const orders = await this.orderModel.find().exec()
    return orders
  }

  insert(model: object) {
    const newOrder = new this.orderModel(model)
    return newOrder.save()
  }

  async deleteOrder(orderId: string) {
    const result = await this.orderModel
      .deleteOne({ _id: orderId })
      .exec()
    const found = result.n > 0
    if (!found) {
      throw new NotFoundException('Could not find order.')
    }
  }
}