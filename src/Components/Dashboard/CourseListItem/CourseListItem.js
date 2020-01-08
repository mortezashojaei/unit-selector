import React from 'react'

const CourseListItem = props => {
    return (
        <li>
            <span>{props.name}</span>
            <button onClick={() => props.onSelect(props.id)}>+</button>
        </li>
    )
}

export default CourseListItem