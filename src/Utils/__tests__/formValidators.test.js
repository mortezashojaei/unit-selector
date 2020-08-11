import { isEmailValid } from "../formValidators";

test("abcd@g is a invalid email", () => {
  expect(isEmailValid("abcdg@kmvf")).toBe(false);
});

test("morteza@gmail.com is a valid email", () => {
  expect(isEmailValid("morteza@gmail.com")).toBe(true);
});
