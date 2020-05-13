import React from 'react'
import styles from './CourseHover.module.scss'

const CourseHover = props => {
    const week = [null,'شنبه','یکشنبه','دوشنبه','سه شنبه','چهارشنبه','پنج شنبه', 'جمعه']
    const hour = [null, '08:00-10:00', '10:00-12:00', '13:30-15:30','15:30-17:30']
    return (
        <div onMouseLeave={props.onMouseLeave} onMouseEnter={props.onMouseEnter} className={styles.mainDiv}>
            <div> درس : <span className={styles.value}>{props.name}</span></div>
            <div>استاد : <span> {props.teacher_name}</span></div>
            <div>زمان : <span>{props.class_times.map(time => 
               <div><p>{week[time.day]} </p> <p>{hour[time.time]}</p></div>
            )}</span></div>
            <div>{props.type === 0 ? <span>عمومی</span> : <span>تخصصی</span>}</div>
            <div></div>
            </div>
    )
}

export default CourseHover