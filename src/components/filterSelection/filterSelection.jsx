import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setActiveFilter } from '../../redux/slices/sliceFilterReduser'

import styles from './filterSelection.module.scss'

function filterSelection() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters.filters)

  const handleActiveFilter = (name) => {
    dispatch(setActiveFilter(name))
  }

  return (
    <div className={styles.filterBox}>
      <h3 className={styles.filterBox__title}>Количество пересадок</h3>
      <ul className={styles.filterBox__list}>
        {filters.map((filter) => (
          <li key={filter.name} className={styles.filterBox__item}>
            <input
              id={filter.name}
              name={filter.name}
              type="checkbox"
              checked={filter.active}
              onChange={() => handleActiveFilter(filter.name)}
            />
            <label htmlFor={filter.name}>{filter.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default filterSelection
