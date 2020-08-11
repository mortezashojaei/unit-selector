const { fetchMajors } = require("Utils/ApiCalls/FetchList");
const { doesEmailExist } = require("Utils/ApiCalls/Auth");

test("majors fetches successfully", () => {
  fetchMajors().then((response) => expect(response.StatusCode).toEqual(200));
});

test("uniq mails checks successfully", () => {
  doesEmailExist({ email: "I_AM_UNIQ_EMAIL_ADDRESS@b.com" }).then((response) =>
    expect(response.StatusCode).toEqual(200)
  );
});

test("ununiq mails checks successfully", () => {
  doesEmailExist({ email: "a@f.com" }).then((response) =>
    expect(response.StatusCode).toEqual(200)
  );
});
