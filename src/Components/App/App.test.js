const { default: App } = require("./Routing");
import { shallow } from "enzyme";
import React from "react";

test("app.js renders successfully", () => {
  const component = shallow(<App />);
  expect(component.render());
});
