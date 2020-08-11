const { default: NotFound } = require("../NotFound");
import { shallow } from "enzyme";
import React from "react";
import { Dialogues } from "Utils/Dialogues";

test("NotFound component shows not found successfully", () => {
  const component = shallow(<NotFound />);
  expect(component.text()).toContain(Dialogues.notFoundPage);
});
