import { get, post, deleteMethod } from "./API";

export function fetchCourses(params = "") {
  return get("/api/course/", params);
}

export function addCourse(course) {
  return post("/api/user/course/", course);
}
// export function deleteCourse(courseItem) {
//   return post("/api/user/course/", courseItem);
// }

export function fetchUserCourses() {
  return get("/api/user/course/");
}

export function deleteCourse(id) {
  return post("/api/user/course/delete/", { register_id: id });
}
