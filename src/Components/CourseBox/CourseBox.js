import React from 'react'
import CourseList from '../CourseList/CourseList'

const CourseBox = props => {
    return (
        <div>
            <p>جستجوگر درس</p>
            <input
            placeholder=" نام درس را تایپ کنید..."/>
            <button>دروس <span>چارت</span></button>
            <button>دروس <span>عمومی</span></button>
            <CourseList/>
        </div>
    )
}

export default CourseBox