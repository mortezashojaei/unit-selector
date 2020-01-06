import React, {useState} from 'react'
import CourseListItem from '../CourseListItem/CourseListItem'

const CourseList = props => {
    const [courses, setCourses] = useState([
        {
            name: 'مدار الکتریکی',
            id: '1'
        }
    ])
    return (
        <div>
            <ul>
                {courses.map(course => <CourseListItem {...course}/>)}
            </ul>
        </div>
    )
}

export default CourseList