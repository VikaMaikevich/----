import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setActive } from '../../redux/slices/sliceButtonReduser'

import styles from './checkbox.module.scss'

function Checkbox() {
  const tabsData = useSelector((state) => state.tabs.tabs)
  const dispatch = useDispatch()

  const handleActiveTab = (name) => dispatch(setActive(name))

  return (
    <div className={styles.checkboxes}>
      {tabsData.map((tab) => (
        <button
          type="button"
          key={tab.name}
          className={tab.active ? `${styles.checkbox} ${styles.checkbox_active}` : styles.checkbox}
          onClick={() => handleActiveTab(tab.name)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Checkbox
