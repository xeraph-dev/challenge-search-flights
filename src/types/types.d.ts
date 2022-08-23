interface TravelFilterOptions {
  destinations: string[]
  flightTypes: string[]
  maxPassengersTypes: Record<string, number>
  origins: string[]
  passengersTypes: string[]
  travelClasses: string[]
}

interface TravelFilter {
  depatureDate: number
  destination: string
  flightType: string
  origin: string
  passengers: Record<string, number>
  returnDate: number
  travelClass: string
}

interface Travel {
  depatureDate: number
  destination: string
  flightType: strign
  id: number
  max_passengers: Record<string, number>
  origin: string
  returnDate: number
  travelClass: string
}
