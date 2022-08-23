import './App.scss'

import { DateTime } from 'luxon'
import { useCallback, useLayoutEffect, useState } from 'react'

import Booking from './components/Booking'
import { repos } from './services/repos'

const initFilter: TravelFilter = {
  depatureDate: Math.round(DateTime.fromMillis(Date.now()).toSeconds()),
  destination: '',
  flightType: '',
  origin: '',
  passengers: {},
  returnDate: Math.round(DateTime.fromMillis(Date.now()).toSeconds()),
  travelClass: '',
}

const initFilterOption: TravelFilterOptions = {
  destinations: [],
  flightTypes: [],
  origins: [],
  passengersTypes: [],
  travelClasses: [],
  maxPassengersTypes: {},
}

export default function App() {
  const [filter, setFilter] = useState<TravelFilter>(initFilter)
  const [filterOption, setFilterOption] = useState<TravelFilterOptions>(initFilterOption)

  const handleFilter = useCallback((filter: TravelFilter) => {
    setFilter(filter)
  }, [])

  const handleSearch = useCallback(() => {
    console.log('searching')
  }, [])

  const getFilterOptions = useCallback(async () => {
    const data = await repos.travel.getFilterOptions()
    setFilterOption(data)

    setFilter({
      ...initFilter,
      flightType: data.flightTypes[0],
      travelClass: data.travelClasses[0],
      passengers: Object.keys(data.maxPassengersTypes).reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}),
    })
  }, [])

  useLayoutEffect(() => {
    getFilterOptions()
  }, [getFilterOptions])

  return (
    <div className="app">
      <Booking filter={filter} onFilter={handleFilter} filterOptions={filterOption} onSearch={handleSearch} />
    </div>
  )
}
