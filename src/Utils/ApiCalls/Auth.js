import { get, post, put } from "./API";

export function login(data) {
  return post("/api/user/login/", data);
}

export function signup(data, type) {
  if (type === "put") {
    delete data["password"];
    console.log(data.full_name);
    return put("/api/user/", data);
  }
  return post("/api/user/", data);
}
export function info() {
  return get("/api/user/");
}

export function doesEmailExist(data) {
  return post("/api/user/check/", data);
}
