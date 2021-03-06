import React from "react";
//Import Enzyme with shallow to test component as a unit
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
//Importing component that will be tested
import HomeNavigation from "./../containers/HomeNavigation.js";

//takes snapshot of component
test("Component renders as expected", () => {
  const component = shallow(<HomeNavigation />);
  let tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
