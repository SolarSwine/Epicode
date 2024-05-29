import { Product } from "./product"

export interface Root {
  products: Product[]
  total: number
  skip: number
  limit: number
}
