import React, { useEffect } from "react";
import Course from "./Course";
import "./Calender.Module.scss";
import { Dialogues } from "Utils/Dialogues";

const Calender = ({
  courses = [
    {
      name: "نحلیل طراحی",
      teacher_name: "میرطاری",
      class_times: [
        { day: 6, time: 1 },
        { day: 1, time: 2 },
      ],
    },
    {
      name: "نحلیل طراحی",
      teacher_name: "میرطاری",
      class_times: [
        { day: 4, time: 1 },
        { day: 2, time: 3 },
      ],
    },
  ],
  onDelete,
}) => {
  function getCourse(day, time) {
    return courses.find((course) =>
      course.class_times.find(
        (dayTime) => dayTime.time == time && dayTime.day == day
      )
    );
  }

  return (
    <div className="calender-container">
      <div className="columns-container">
        <div className="time-slot-column">
          <div className="time-slots-wrapper">
            <div className="time-slot-box">
              <div className="orange">8</div>
              <div>{Dialogues.till}</div>
              <div className="orange">10</div>
            </div>
            <div className="time-slot-box">
              <div className="orange">10</div>
              <div>{Dialogues.till}</div>
              <div className="orange">12</div>
            </div>
            <div className="time-slot-box">
              <div className="orange">13</div>
              <div>{Dialogues.till}</div>
              <div className="orange">15</div>
            </div>
            <div className="time-slot-box">
              <div className="orange">15</div>
              <div>{Dialogues.till}</div>
              <div className="orange">17</div>
            </div>
          </div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">{Dialogues.saturday}</div>
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(1, 1)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(1, 2)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(1, 3)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(1, 4)} />
          </div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">{Dialogues.sunday}</div>
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(2, 1)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(2, 2)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(2, 3)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(2, 4)} />
          </div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">{Dialogues.monday}</div>
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(3, 1)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(3, 2)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(3, 3)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(3, 4)} />
          </div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">{Dialogues.tuesday}</div>
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(4, 1)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(4, 2)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(4, 3)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(4, 4)} />
          </div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">{Dialogues.wednesday}</div>
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(5, 1)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(5, 2)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(5, 3)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(5, 4)} />
          </div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">{Dialogues.thursday}</div>
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(6, 1)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(6, 2)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(6, 3)} />
          </div>
          <div className="course-box">
            <Course onDelete={onDelete} course={getCourse(6, 4)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
