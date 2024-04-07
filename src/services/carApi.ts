import type { CarApi, CarCard } from '../types/cars'
import { API_URL } from '../constants/api'

export const carListApi = async (): Promise<CarApi[]> => {
  const response = await fetch(`${API_URL}/api/Cars`)
  const data = await response.json()
  return data
}

export const mapCars = (cars: CarApi[]): CarCard[] => {
  return cars.map((car) => {
    const { idCar, name, year, price, image } = car
    return { idCar, name, year, price, image }
  })
}
