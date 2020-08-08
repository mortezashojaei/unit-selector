import React from 'react';
import PropTypes from 'prop-types';
import { weekDays, dayTimes, Dialogues } from 'Utils/Dialogues';
import { popUpFakeData } from 'Utils/popUpFakeData';
import { addCourse } from 'Utils/ApiCalls/CourseBox';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import styles from './ClassItem.module.scss';

// this function should handle the collisions
/* weekly schedule should be fetched from redux's store 
or 
fetched directly from server via ajax requests */
const handleCollisions = (currentClass, weeklySchedule) => {
	let collidedClass = null;
	// for now we'll just show some fake data
	if (currentClass.professorName === popUpFakeData[0].professorName) {
		collidedClass = 'معماری کامپیوتر';
		return (
			<p className={styles.collisionError}>
				{Dialogues.hasConflictWith}
				{' ' + collidedClass}
			</p>
		);
	}
	return false;
};

const showClassTimes = (classTimes) => {
	return classTimes.map((classItem) => (
		<span>
			{' '}
			{weekDays[classItem.day]} : {dayTimes[classItem.time]}{' '}
		</span>
	));
};

const ClassItem = ({ professorName, classTimes, setCourses, classItem, togglePopUp }) => {
	return (
		<div className={styles.classItem}>
			<p className={styles.professorName}>
				<span>{Dialogues.teacher} : </span>
				{professorName}
			</p>
			<p className={styles.classTimes}>{showClassTimes(classTimes)}</p>
			{handleCollisions({ professorName, classTimes }) || (
				<button
					className={styles.pickClass}
					onClick={() => {
						addCourse(classItem)
							.then((response) => {
								Swal.fire({
									icon: 'success',
									title: '',
									text: Dialogues.wasAddedSuccessfully,
								});
								setCourses((courses) => [...courses, classItem]);
							})
							.catch((error) => {
								Swal.fire({
									icon: 'error',
									title: '',
									text: Dialogues.cantTakeThisCourse,
								});
							});
					}}
				>
					{Dialogues.takeTheCourse}
				</button>
			)}
		</div>
	);
};

ClassItem.propTypes = {
	professorName: PropTypes.string.isRequired,
	classTimes: PropTypes.array.isRequired,
};

export default ClassItem;
