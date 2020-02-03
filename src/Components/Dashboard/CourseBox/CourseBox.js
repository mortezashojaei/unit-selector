import React, {useState, useEffect} from 'react'
import CourseList from '../CourseList/CourseList'
import styles from './CourseBox.module.scss'
import axios from 'axios'

const CourseBox = props => {
    const [courses, setCourses] = useState([])
    const [searchText, setSearchText] = useState('')
    const [type, setType] = useState('chart')
    const [toggleType, setToggleType] = useState({
        chart: 'active',
        public: ''
    })
    const filterCourses = () => {
        return courses.filter(course => 
                        course.name.includes(searchText.trim())).filter(course => 
                            {
                                if(type ==='chart') {
                                    return course.type === 1
                                }else { return course.type === 0}
                            })
    }
    useEffect(() => {
        axios.get('https://2dcfb1c2.ngrok.io/api/course').then(res => {
            console.log(res.data)
            setCourses(res.data)
        }).catch(e => {
            console.log(e)
        })
    },[])
    const onInputChange = e => {
        setSearchText(e.target.value)
    }
    const onSelect = (id) => {
        console.log(courses.find(course => course.id === id))
    }
    const onChartFilter = () => {
        setToggleType({
            chart: 'active',
            public: ''
        })
        setType('chart')
    }
    const onPublicFilter = () => {
        setToggleType({
            public: 'active',
            chart: ''
        })
        setType('public')
    }
    return (
        <div className={styles.mainDiv}>
                <p>جستجوگر درس</p>
                <input
                value={searchText}
                onChange={onInputChange}
                placeholder=" نام درس را تایپ کنید..."/>
                <div className={styles.buttonContainer}>
                    <button className={styles[toggleType.public]} onClick={onPublicFilter}>دروس <span>عمومی</span></button>
                    <button className={styles[toggleType.chart]} autoFocus onClick={onChartFilter} >دروس <span>چارت</span></button>
                </div>
                <CourseList onSelect={onSelect} courses={filterCourses()}/>
        </div>
    )
}

export default CourseBox