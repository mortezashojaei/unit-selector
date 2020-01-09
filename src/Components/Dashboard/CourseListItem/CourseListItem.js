import React, {useState} from 'react'
import styles from './CourseListItem.module.scss'
import CourseHover from '../CourseHover/CourseHover'

const CourseListItem = props => {
    const [showHover, setShowHover] = useState(false)
    
    const onMouseEnter = () => {
        setShowHover(true)
    }
    const onMouseLeave = () => {
        setShowHover(false)
    }
    return (
        <div className={styles.container}>
        {showHover && 
            <div className={styles.hoverComponent}>
                <CourseHover 
                onMouseLeave={onMouseLeave} 
                onMouseEnter={onMouseEnter} 
                {...props}/>
            </div>}
        <div className={styles.listItem}>
            <span 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => props.onSelect(props.id)}>{props.name}</span>
            <button onClick={() => props.onSelect(props.id)}>+</button>
        </div>
        
        </div>
    )
}

export default CourseListItem