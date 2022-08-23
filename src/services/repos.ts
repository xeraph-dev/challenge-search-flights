import { memoryTravelRepository, TravelRepository } from './Travel'

export interface Repositories {
  travel: TravelRepository
}

export const repos: Repositories = {
  travel: memoryTravelRepository,
}
