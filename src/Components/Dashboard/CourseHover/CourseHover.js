import React from 'react'
import styles from './CourseHover.module.scss'

const CourseHover = props => {
    return (
        <div onMouseLeave={props.onMouseLeave} onMouseEnter={props.onMouseEnter} className={styles.mainDiv}>
            <div> درس : <span className={styles.value}>{props.name}</span></div>
            <div>استاد : <span> --</span></div>
            <div>زمان : <span>-- : --</span></div>
            <div>{props.type === 'chart' ? <span>عمومی</span> : <span>تخصصی</span>}</div>
            <div></div>
        </div>
    )
}

export default CourseHover