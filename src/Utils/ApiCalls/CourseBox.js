import { get } from "./API";

export function fetchCourses() {
  return get("/api/course/");
}
