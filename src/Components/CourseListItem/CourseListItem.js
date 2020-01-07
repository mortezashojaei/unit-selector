import React from 'react'
import styles from './CourseListItem.module.scss'

const CourseListItem = props => {
    return (
        <div className={styles.listItem}>
            <span onClick={() => props.onSelect(props.id)}>{props.name}</span>
            <button onClick={() => props.onSelect(props.id)}>+</button>
        </div>
    )
}

export default CourseListItem