import React, {useState} from 'react'
import CourseListItem from '../CourseListItem/CourseListItem'
import styles from './CourseList.module.scss'

const CourseList = props => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.list}>
                {props.courses.map(course => <CourseListItem key={course.id} onSelect={props.onSelect} {...course}/>)}
            </div>
        </div>
    )
}

export default CourseList