import './Booking.scss'

import _ from 'lodash'
import { useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { HiSwitchHorizontal } from 'react-icons/hi'

import { dateToSeconds, formatDate } from '~/utils/utils'

import Dropdown from './Dropdown'

interface BookingProps {
  filter: TravelFilter
  filterOptions: TravelFilterOptions
  onFilter: (filter: TravelFilter) => void
  onSearch: () => void
}

export default function Booking({ filter, filterOptions, onFilter, onSearch }: BookingProps) {
  const [flightTypeOpen, setFlightTypeOpen] = useState(false)
  const [travelClassesOpen, setTravelClassesOpen] = useState(false)
  const [passengersTypeOpen, setPassengersTypeOpen] = useState(false)

  const passengersButton = useMemo(() => {
    const sum = Object.values(filter.passengers).reduce((acc, curr) => acc + curr, 0)
    return `${sum} traveler${sum > 1 ? 's' : ''}`
  }, [filter.passengers])

  const renderFlightTypes = useMemo(
    () => (
      <li>
        <Dropdown
          open={flightTypeOpen}
          onOpen={() => setFlightTypeOpen(true)}
          onClose={() => setFlightTypeOpen(false)}
          button={filter.flightType}
          content={
            <ul className="booking--dropdown-list">
              {filterOptions.flightTypes.map(v => (
                <li key={v}>
                  <button
                    type="button"
                    onClick={() => {
                      onFilter({ ...filter, flightType: v })
                      setFlightTypeOpen(false)
                    }}
                  >
                    {v}
                  </button>
                </li>
              ))}
            </ul>
          }
        />
      </li>
    ),
    [filter, filterOptions.flightTypes, flightTypeOpen, onFilter],
  )

  const renderPassengersTypes = useMemo(
    () => (
      <li>
        <Dropdown
          open={passengersTypeOpen}
          onOpen={() => setPassengersTypeOpen(true)}
          onClose={() => setPassengersTypeOpen(false)}
          button={passengersButton}
          content={
            <ul className="booking--passengers-types">
              {filterOptions.passengersTypes.map(v => (
                <li key={v}>
                  <span>{_.capitalize(v)}</span>
                  <div>
                    <button
                      type="button"
                      disabled={filter.passengers[v] === 0}
                      onClick={() =>
                        onFilter({
                          ...filter,
                          passengers: {
                            ...filter.passengers,
                            [v]: filter.passengers[v] - 1,
                          },
                        })
                      }
                    >
                      -
                    </button>
                    <span>{filter.passengers[v]}</span>
                    <button
                      type="button"
                      disabled={filter.passengers[v] === filterOptions.maxPassengersTypes[v]}
                      onClick={() =>
                        onFilter({
                          ...filter,
                          passengers: {
                            ...filter.passengers,
                            [v]: filter.passengers[v] + 1,
                          },
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          }
        />
      </li>
    ),
    [
      filter,
      filterOptions.maxPassengersTypes,
      filterOptions.passengersTypes,
      onFilter,
      passengersButton,
      passengersTypeOpen,
    ],
  )

  const renderTravelClassesOpen = useMemo(
    () => (
      <li>
        <Dropdown
          open={travelClassesOpen}
          onOpen={() => setTravelClassesOpen(true)}
          onClose={() => setTravelClassesOpen(false)}
          button={filter.travelClass}
          content={
            <ul className="booking--dropdown-list">
              {filterOptions.travelClasses.map(v => (
                <li key={v}>
                  <button
                    type="button"
                    onClick={() => {
                      onFilter({ ...filter, travelClass: v })
                      setTravelClassesOpen(false)
                    }}
                  >
                    {v}
                  </button>
                </li>
              ))}
            </ul>
          }
        />
      </li>
    ),
    [filter, filterOptions.travelClasses, onFilter, travelClassesOpen],
  )

  const renderOrigin = useMemo(
    () => (
      <input
        type="text"
        list="booking--origins"
        value={filter.origin}
        onChange={event =>
          onFilter({
            ...filter,
            origin: event.target.value,
          })
        }
      />
    ),
    [filter, onFilter],
  )

  const renderSwitch = useMemo(
    () => (
      <button
        type="button"
        title="Switch origin-destinations"
        onClick={() =>
          onFilter({
            ...filter,
            origin: filter.destination,
            destination: filter.origin,
          })
        }
      >
        <HiSwitchHorizontal />
      </button>
    ),
    [filter, onFilter],
  )

  const renderDestination = useMemo(
    () => (
      <input
        type="text"
        list="booking--destinations"
        value={filter.destination}
        onChange={event =>
          onFilter({
            ...filter,
            destination: event.target.value,
          })
        }
      />
    ),
    [filter, onFilter],
  )

  const renderDepatureDate = useMemo(
    () => (
      <input
        type="date"
        value={formatDate(filter.depatureDate * 1000)}
        max={formatDate(filter.returnDate * 1000)}
        onChange={event =>
          onFilter({
            ...filter,
            depatureDate: dateToSeconds(event.target.value),
          })
        }
      />
    ),
    [filter, onFilter],
  )

  const renderReturnDate = useMemo(
    () => (
      <input
        type="date"
        value={formatDate(filter.returnDate * 1000)}
        min={formatDate(filter.depatureDate * 1000)}
        onChange={event =>
          onFilter({
            ...filter,
            returnDate: dateToSeconds(event.target.value),
          })
        }
      />
    ),
    [filter, onFilter],
  )

  return (
    <div className="booking">
      <h3>Search hundreds of travel sites at once.</h3>
      <header>
        <ul>
          {renderFlightTypes}
          {renderPassengersTypes}
          {renderTravelClassesOpen}
        </ul>
      </header>
      <section>
        {renderOrigin}
        {renderSwitch}
        {renderDestination}
        {renderDepatureDate}
        {renderReturnDate}
        <button type="button" title="Search travel" onClick={() => onSearch()}>
          <FaSearch />
        </button>
      </section>
      <datalist id="booking--origins">
        {filterOptions.origins.map(v => (
          <option key={v} value={v} />
        ))}
      </datalist>
      <datalist id="booking--destinations">
        {filterOptions.destinations.map(v => (
          <option key={v} value={v} />
        ))}
      </datalist>
    </div>
  )
}
