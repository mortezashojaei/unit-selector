const { default: NavBar } = require("../NavBar");
import { shallow } from "enzyme";
import React from "react";

test("NavBar component shows  successfully", () => {
  const component = shallow(<NavBar pageName="test" />);
  expect(component.text()).toBe("");
});
