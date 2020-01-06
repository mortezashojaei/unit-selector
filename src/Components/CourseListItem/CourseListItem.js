import React from 'react'

const CourseListItem = props => {
    return (
        <li><span>{props.name}</span><button>+</button></li>
    )
}

export default CourseListItem