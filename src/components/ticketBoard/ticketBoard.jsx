import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BarLoader from 'react-spinners/BarLoader'

import TicketCard from '../ticketCard/ticketCard'
import { showMoreTickets } from '../../redux/slices/sliceTicketsReduser'
import { fetchSearchId, fetchTickets } from '../../redux/server/actions'

import styles from './ticketBoard.module.scss'

function TicketBoard() {
  const dispatch = useDispatch()
  const [visibleTickets, setVisibleTickets] = useState(5)
  const { id, tickets, isLoading, errorMessage } = useSelector((state) => state.tickets)
  const filters = useSelector((state) => state.filters.filters)
  const activeFilterCount = filters.filter((item) => item.active).length
  const tabs = useSelector((state) => state.tabs.tabs)

  useEffect(() => {
    dispatch(fetchSearchId())
  }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(fetchTickets(id))
    }
  }, [dispatch, id])

  const handleShowMoreTickets = () => {
    setVisibleTickets((prev) => prev + 5)
    dispatch(showMoreTickets())
  }

  const filterTicketsByStops = () => {
    const activeFilters = filters.filter((filter) => filter.active && filter.name !== 'all')

    if (!activeFilters) {
      return tickets
    }

    return tickets.filter((ticket) => {
      const ticketStops1 = ticket.segments[0].stops.length
      const ticketStops2 = ticket.segments[1].stops.length

      return activeFilters.some((filter) => {
        if (filter.name === 'not' && ticketStops1 === 0 && ticketStops2 === 0) {
          return true
        }
        if (filter.name === 'one' && ticketStops1 === 1 && ticketStops2 === 1) {
          return true
        }
        if (filter.name === 'two' && ticketStops1 === 2 && ticketStops2 === 2) {
          return true
        }
        if (filter.name === 'three' && ticketStops1 === 3 && ticketStops2 === 3) {
          return true
        }
        return false
      })
    })
  }

  const filteredArr = filterTicketsByStops(tickets, filters)

  const sortTab = (arr) => {
    const activeTab = tabs.find((item) => item.active)
    switch (activeTab.name) {
      case 'cheapest':
        return arr.sort((a, b) => a.price - b.price)
      case 'fastest':
        return arr.sort(
          (a, b) =>
            Math.floor(a.segments[0].duration + a.segments[1].duration) -
            Math.floor(b.segments[0].duration + b.segments[1].duration)
        )
      case 'optimal':
        return arr
      default:
        return []
    }
  }

  return (
    <ul className={styles.tickets}>
      {!activeFilterCount ? (
        <div className={styles.title}>Рейсов, подходящих под заданные фильтры, не найдено</div>
      ) : null}
      {isLoading ? (
        <div className={styles.loader}>
          <BarLoader color="#2196f3" width={500} height={10} speedMultiplier={0.3} />
        </div>
      ) : null}
      {!errorMessage &&
        sortTab(filteredArr)
          .slice(0, visibleTickets)
          .map((ticket, i) => (
            <TicketCard
              key={ticket.id || i}
              ticket={ticket}
              carrier={ticket.carrier}
              segments={ticket.segments}
              price={ticket.price}
            />
          ))}
      {activeFilterCount > 0 && (
        <button type="button" className={styles.button} onClick={handleShowMoreTickets}>
          Показать еще 5 билетов!
        </button>
      )}
    </ul>
  )
}

export default TicketBoard
