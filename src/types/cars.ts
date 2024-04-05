export interface CarApi {
  idCar: number
  name: string
  year: number
  price: number
  image: string
  createdAt: string
  modifiedAt: string
  idBrand: number
  brand: any
  appointments: any
}

export interface CarCard {
  idCar: number
  name: string
  year: number
  price: number
  image: string
}
