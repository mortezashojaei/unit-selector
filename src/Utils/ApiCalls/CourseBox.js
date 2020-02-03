import { get, post } from "./API";

export function fetchCourses(params = "") {
  return get("/api/course/", params);
}

export function addCourse(course) {
  return post("/api/user/course/", course);
}
