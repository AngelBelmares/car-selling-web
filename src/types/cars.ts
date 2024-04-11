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

export interface Appointment {
  idAppointment: number
  date: string
  createdAt: string
  modifiedAt: string
  idUser: string
  user: any
  idCar: number
  car: CarApi
}

export interface CarCard {
  idCar: number
  name: string
  year: number
  price: number
  image: string
}

export interface RegisterAppointment {
  userId: string
  idCar: string
  date: Date
  token: string
}
