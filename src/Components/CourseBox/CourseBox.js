import React from 'react'
import CourseList from '../CourseList/CourseList'
import styles from './CourseBox.module.scss'
import axios from 'axios'

class CourseBox extends React.Component {
    state = {
        courses: [],
        searchText: '',
        type: 'chart'
    }
    componentDidMount(){
        axios.get('http://localhost:3000/courses').then(res => {
            console.log(res.data)
            this.setState({courses: res.data})
        }).catch(e => {
            console.log(e)
        })
    }
    filterCourses = () => {
        return this.state.courses.filter(course => 
            course.name.toLowerCase().includes(this.state.searchText.toLowerCase())).filter(course => 
                course.type === this.state.type)   
    }
    onInputChange = (e) => {
        this.setState({searchText: e.target.value})
    }
    onChartFilter = () => {
        this.setState({type: 'chart'})
    }
    onPublicFilter = () => {
        this.setState({type: 'public'})
    }
    onSelect = (id) => {
        console.log(this.state.courses.find(course => course.id === id))
    }
    render(){
        return (
            <div className={styles.mainDivP}>
                <p className={styles.p}>جستجوگر درس</p>
                <input
                value={this.state.searchText}
                onChange={this.onInputChange}
                placeholder=" نام درس را تایپ کنید..."/>
                <button className={`${styles.button}`} onClick={this.onChartFilter}>دروس <span>چارت</span></button>
                <button className={`${styles.button}`} onClick={this.onPublicFilter}>دروس <span>عمومی</span></button>
                <CourseList onSelect={this.onSelect} courses={this.filterCourses()}/>
            </div>
        )
    }
}

export default CourseBox