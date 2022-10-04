export interface Product {
  _id: string
  id: string
  name: string
  price: string
  description: string
  imageUrl: string
  averageRating: string
}

export interface OrderProduct {
  id: string
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
}


export interface Order {
  products: OrderProduct[]
  shippingAddress: Address
  userId: string
}

export interface ConfigService {
  name: string
  url: string
}

export interface ProductInventory {
  id: string
  quantity: number
}
