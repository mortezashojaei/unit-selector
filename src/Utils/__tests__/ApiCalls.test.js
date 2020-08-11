const { fetchMajors } = require("Utils/ApiCalls/FetchList");
const { doesEmailExist } = require("Utils/ApiCalls/Auth");
const { fetchCourses } = require("Utils/ApiCalls/CourseBox");

test("majors fetches successfully", async (done) => {
  const response = await fetchMajors();
  expect(response.status).toEqual(200);
  done();
}, 15000);

test("uniq mails checks successfully", async (done) => {
  const response = await doesEmailExist({
    email: "I_AM_UNIQ_EMAIL_ADDRESS@b.com",
  });
  expect(response.status).toEqual(200);
  done();
}, 15000);