const { default: Calender } = require("../Calender");
import { mount } from "enzyme";
import React from "react";

test("each positions just have one member", () => {
  const courses = [
    {
      name: "نحلیل طراحی",
      teacher_name: "Dr.Mirtaheri",
      class_times: [{ day: 6, time: 1 }],
    },
    {
      name: "درس متفاوت",
      teacher_name: "Dr.X",
      class_times: [{ day: 6, time: 1 }],
    },
  ];
  const component = mount(<Calender courses={courses} onDelete={() => {}} />);
  expect(
    component.findWhere((item) => item.hasClass("course-card")).length
  ).toBe(1);
});
