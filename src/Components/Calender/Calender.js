import React from "react";
import "./Calender.Module.scss";
const Calender = () => {
  return (
    <div className="calender-container">
      <div className="columns-container">
        <div className="time-slot-column">
          <div className="time-slots-wrapper">
            <div className="time-slot-box">
              <div className="orange">8</div>
              <div>تا</div>
              <div className="orange">10</div>
            </div>
            <div className="time-slot-box">
              <div className="orange">10</div>
              <div>تا</div>
              <div className="orange">12</div>
            </div>
            <div className="time-slot-box">
              <div className="orange">13</div>
              <div>تا</div>
              <div className="orange">15</div>
            </div>
            <div className="time-slot-box">
              <div className="orange">15</div>
              <div>تا</div>
              <div className="orange">17</div>
            </div>
          </div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">شنبه</div>
          </div>
          <div className="course-box">
            <div className="course-card">
                <div className="course-name">
                    تحلیل طراحی
                </div>
            </div>
          </div>
          <div className="course-box">
          <div className="course-card">
              <div className="course-name">
                  تحلیل طراحی
              </div>
                  
                  </div>
          </div>
          <div className="course-box"></div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">یکشنبه</div>
          </div>
          <div className="course-box">
            <div className="course-card">
                <div className="course-name">
                    تحلیل طراحی
                </div>
            </div>
          </div>
          <div className="course-box"></div>
          <div className="course-box">
            <div className="course-card">
                <div className="course-name">
                    تحلیل طراحی
                </div>
            </div>
          </div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">دوشنبه</div>
          </div>
          <div className="course-box"></div>
          <div className="course-box"></div>
          <div className="course-box">
            <div className="course-card">
                <div className="course-name">
                    تحلیل طراحی
                </div>
            </div>
          </div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">سه شنبه</div>
          </div>
          <div className="course-box"></div>
          <div className="course-box"></div>
          <div className="course-box"></div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">چهارشنبه</div>
          </div>
          <div className="course-box"></div>
          <div className="course-box"></div>
          <div className="course-box"></div>
        </div>
        <div className="main-column">
          <div className="day-name-box">
            <div className="day-name">پنجشنبه</div>
          </div>
          <div className="course-box"></div>
          <div className="course-box"></div>
          <div className="course-box"></div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
