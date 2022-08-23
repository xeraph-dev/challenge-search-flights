import mockFilterOptions from '#/filter.json'
import mockTravels from '#/travel.json'
import { camelize } from '~/utils/utils'

export interface TravelRepository {
  getFilterOptions: () => Promise<TravelFilterOptions>
  getTravels: (filter: TravelFilter) => Promise<Travel[]>
}

export const memoryTravelRepository: TravelRepository = {
  async getTravels(filter) {
    return mockTravels.map(v => camelize(v)) as Travel[]
  },
  async getFilterOptions() {
    return camelize(mockFilterOptions) as TravelFilterOptions
  },
}
