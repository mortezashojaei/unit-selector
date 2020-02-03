import { get } from "./API";

export function fetchCourses(params = "") {
  return get("/api/course/", params);
}
