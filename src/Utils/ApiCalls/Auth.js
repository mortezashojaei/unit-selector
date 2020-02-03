import { get, post, put } from "./API";

export function login(data) {
  return post("/api/user/login/", data);
}

export function signup(data, type) {
  if (type === "put") {
    delete data["password"];
    return put("/api/user/", data);
  }
  return post("/api/user/", data);
}
export function info() {
  return get("/api/user/", null);
}

export function doesEmailExist(data) {
  return post("/api/user/check/", data);
}
