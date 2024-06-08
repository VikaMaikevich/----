import React from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import FilterSelection from '../filterSelection/filterSelection'
import TicketBoard from '../ticketBoard/ticketBoard'
import Checkbox from '../checkbox/checkbox'
import imgLogo from '../../picture/Logo@1x.png'

import styles from './app.module.scss'

function App() {
  return (
    <>
      <Offline>
        <div className="offline">
          <Alert
            type="error"
            message="Sorry, the site is unavailable due to connection issues. Please check your internet connection and refresh the page"
          />
        </div>
      </Offline>
      <Online>
        <div className={styles.app}>
          <div className={styles.logo}>
            <img src={imgLogo} alt="logo" />
          </div>
          <div className={styles.content}>
            <FilterSelection />
            <div className={styles.ticketsBoard}>
              <Checkbox />
              <TicketBoard />
            </div>
          </div>
        </div>
      </Online>
    </>
  )
}

export default App
