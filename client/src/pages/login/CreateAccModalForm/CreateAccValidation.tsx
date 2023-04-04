import * as Yup from "yup";

export const validation = Yup.object({
  firstname: Yup.string()
    .min(2, "Name must be atleast 2 characters")
    .required("Name must be atleast 2 characters"),
  lastname: Yup.string()
    .min(2, "Name must be atleast 2 characters")
    .required("Name must be atleast 2 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  day: Yup.string().required("You must choose a day"),
  month: Yup.string().required("You must choose a year"),
  year: Yup.string().required("You must choose a month"),
  gender: Yup.string()
    .required("Please select your gender")
    .test(
      "at-least-one-checkbox",
      "Please select at least one checkbox",
      function (value) {
        return value === "male" || value === "female";
      }
    ),
});
