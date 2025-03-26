import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PasswordField } from "../components/PasswordField";
import { Textfield } from "../components/TextField";
import { CustomButtons } from "../components/CustomButtons";
import { useEffect, useState } from "react";
import { DateField } from "../components/DateField";

const signupValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email format"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().nullable(),
  address: Yup.string(),
});

const loginValidationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  isLogin
    ? console.log(loginValidationSchema)
    : console.log(signupValidationSchema);

  useEffect(() => {
    const handlePopState = () => {
      setIsLogin((prev) => !prev);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleToggle = () => {
    const newState = { isLogin: !isLogin };
    window.history.pushState(newState, "", window.location.pathname);
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log("Submitted values:", values);
      resetForm();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white border-2 border-primary rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h1>

        <Formik
          initialValues={
            isLogin
              ? { phone: "", password: "" }
              : {
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  password: "",
                  confirmPassword: "",
                  gender: "",
                  dob: "",
                  address: "",
                }
          }
          validationSchema={
            isLogin ? loginValidationSchema : signupValidationSchema
          }
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form className="space-y-4">
              {!isLogin && (
                <>
                  <div className="flex gap-4">
                    <Textfield
                      label="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      required
                    />
                    <Textfield
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Textfield
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </>
              )}

              <Textfield
                label="Phone Number"
                name="phone"
                number={true}
                value={values.phone}
                onChange={handleChange}
                required
              />

              <PasswordField
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                required
              />

              {!isLogin && (
                <>
                  <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <div className="flex flex-col w-full">
                    <div>
                      <label
                        htmlFor="gender"
                        className="font-semibold text-gray-700 mb-1"
                      >
                        Gender
                      </label>
                      <span className="text-errorColor">*</span>
                    </div>
                    <Field
                      as="select"
                      name="gender"
                      className="border-2 border-primary p-2"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <DateField
                    label="Date of Birth"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                  />

                  <Textfield
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </>
              )}
              <div className="flex justify-center py-4">
                <CustomButtons name={isLogin ? "Login" : "Sign Up"} />
              </div>

              <p className="text-center text-sm mt-4 cursor-pointer">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
