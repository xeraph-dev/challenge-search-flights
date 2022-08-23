#!/use/bin/env node

import fs from 'fs'
import path from 'path'

const passengers = JSON.parse(fs.readFileSync(path.join(process.cwd(), '__mocks__', 'passengers.json'), 'utf-8'))

const travel = JSON.parse(fs.readFileSync(path.join(process.cwd(), '__mocks__', 'travel.json.bak'), 'utf-8'))

const travelClasses = new Set()
const flightTypes = new Set()
const passengersTypes = new Set()
const maxPassengersTypes = {}
const origins = new Set()
const destinations = new Set()

for (const t of travel) {
  const { id: _, ...rest } = passengers.find(v => v.id === t.max_passengers)
  t.max_passengers = rest

  travelClasses.add(t.travel_class)
  flightTypes.add(t.flight_type)

  Object.entries(rest).forEach(([k, v]) => {
    passengersTypes.add(k)

    if (!maxPassengersTypes[k] || maxPassengersTypes[k] < v) maxPassengersTypes[k] = v
  })

  origins.add(t.origin)
  destinations.add(t.destination)
}

fs.writeFileSync(path.join(process.cwd(), '__mocks__', 'travel.json'), JSON.stringify(travel))

fs.writeFileSync(
  path.join(process.cwd(), '__mocks__', 'filter.json'),
  JSON.stringify({
    travel_classes: [...travelClasses].sort(),
    flight_types: [...flightTypes].sort(),
    passengers_types: [...passengersTypes].sort(),
    origins: [...origins].sort(),
    destinations: [...destinations].sort(),
    maxPassengersTypes,
  }),
)
