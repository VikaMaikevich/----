import React from 'react'
import PropTypes from 'prop-types'

import styles from './ticketCard.module.scss'

function ticketCard({ ticket }) {
  const formatTimeDate = (date) => {
    const newDate = new Date(date)
    const hours = newDate.getHours()
    const minutes = newDate.getMinutes()
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
  }

  const formatTimeDuration = (min) => {
    const hours = Math.floor(min / 60)
    const minutes = min % 60
    return `${hours < 10 ? `0${hours}` : hours}ч ${minutes < 10 ? `0${minutes}` : minutes}м`
  }

  const formatEndTime = (date, min) => {
    const startDate = new Date(date)
    const endDate = new Date(startDate.getTime() + min * 60000)
    const hours = endDate.getHours()
    const minutes = endDate.getMinutes()
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
  }

  if (!ticket || !ticket.segments) return null

  const { price, carrier, segments } = ticket

  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <div className={styles.price}>{price} Р</div>
        <div className={styles.logo}>
          <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="logo" />
        </div>
      </div>
      <div className={styles.path}>
        <div className={styles.data}>
          <div className={styles.top}>
            {segments[0].origin} – {segments[0].destination}
          </div>
          <div className={styles.bot}>
            {formatTimeDate(segments[0].date)} – {formatEndTime(segments[0].date, segments[0].duration)}
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.top}>В пути</div>
          <div className={styles.bot}>{formatTimeDuration(segments[0].duration)}</div>
        </div>
        <div className={styles.data}>
          <div className={styles.top}>
            {segments[0].stops.length ? `${segments[0].stops.length} пересадки` : 'без пересадок'}
          </div>
          <div className={styles.bot}>{segments[0].stops.join(',')}</div>
        </div>
      </div>

      <div className={styles.path}>
        <div className={styles.data}>
          <div className={styles.top}>
            {segments[1].origin} – {segments[1].destination}
          </div>
          <div className={styles.bot}>
            {formatTimeDate(segments[1].date)} – {formatEndTime(segments[1].date, segments[1].duration)}
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.top}>В пути</div>
          <div className={styles.bot}>{formatTimeDuration(segments[1].duration)}</div>
        </div>
        <div className={styles.data}>
          <div className={styles.top}>
            {segments[1].stops.length ? `${segments[1].stops.length} пересадки` : 'без пересадок'}
          </div>
          <div className={styles.bot}>{segments[1].stops.join(',')}</div>
        </div>
      </div>
    </li>
  )
}

ticketCard.propTypes = {
  ticket: PropTypes.shape({
    price: PropTypes.number,
    carrier: PropTypes.string,
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        duration: PropTypes.number,
        origin: PropTypes.string,
        destination: PropTypes.string,
        stops: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
}

export default ticketCard
