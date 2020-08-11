const { default: Course } = require("../Course");
import { shallow } from "enzyme";
import React from "react";

test("Course component shows course name", () => {
  const component = shallow(
    <Course
      course={{ name: "course_name", teacher_name: "teacher_name" }}
      onDelete={() => {}}
    />
  );
  expect(component.text()).toContain("course_name");
  expect(component.text()).toContain("teacher_name");
});
