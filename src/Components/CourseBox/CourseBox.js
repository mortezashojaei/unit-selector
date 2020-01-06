import React from 'react'
import CourseList from '../CourseList/CourseList'
import styles from './CourseBox.module.scss'

const CourseBox = props => {
    return (
        <div className={styles.mainDivP}>
            <p className={styles.p}>جستجوگر درس</p>
            <input
            
            placeholder=" نام درس را تایپ کنید..."/>
            <button className={`${styles.button}`}>دروس <span>چارت</span></button>
            <button className={`${styles.button}`}>دروس <span>عمومی</span></button>
            <CourseList/>
        </div>
    )
}

export default CourseBox