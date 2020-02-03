import { get, post } from "./API";

export function fetchCourses() {
  return get("/api/course/");
}

export function addCourse(course) {
  return post("/api/course", course);
}
