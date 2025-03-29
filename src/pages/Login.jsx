import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PasswordField } from "../components/PasswordField";
import { Textfield } from "../components/TextField";
import { CustomButtons } from "../components/CustomButtons";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../api/BaseUrl";
import Cookie from "cookie-universal";

const signupValidationSchema = Yup.object({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const loginValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handlePopState = () => {
      setIsLogin((prev) => !prev);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleToggle = (newIsLogin) => {
    window.history.pushState(
      { isLogin: newIsLogin },
      "",
      window.location.pathname
    );
    setIsLogin(newIsLogin);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white border-2 border-primary rounded-lg shadow-lg">
        {isLogin ? (
          <LoginForm onToggle={() => handleToggle(false)} />
        ) : (
          <SignupForm
            onToggle={() => handleToggle(true)}
            onSuccess={() => handleToggle(true)}
          />
        )}
      </div>
    </section>
  );
};

const LoginForm = ({ onToggle }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Welcome Back!</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await axios.post(`${baseUrl}auth/login/`, values);

            if (response.data.status === 200) {
              const token = response.data.data.token;
              Cookie().set("auth", token, {
                maxAge: 60 * 60,
                path: "/",
              });

              window.location.reload();
              resetForm();
            } else {
              toast.error(response.data.errorMessage);
            }
          } catch (error) {
            console.error("Login submission failed:", error);
          }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <Textfield
              label="Username"
              name="username"
              value={values.username}
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

            <div className="flex justify-center py-4">
              <CustomButtons name={"Login"} type="submit" />
            </div>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onToggle}
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

const SignupForm = ({ onToggle, onSuccess }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            let response = await axios.post(`${baseUrl}auth/register/`, values);
            if (response.data.status === 200) {
              toast.success("Admin created successfully");
              resetForm();
              onSuccess();
            } else {
              toast.error(response.data.errorMessage);
            }
          } catch (error) {
            toast.error("Error creating Admin: " + error.message);
            throw error;
          }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Textfield
                label="First Name"
                name="fname"
                value={values.fname}
                onChange={handleChange}
                required
              />
              <Textfield
                label="Last Name"
                name="lname"
                value={values.lname}
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
              required
            />

            <Textfield
              label="Username"
              name="username"
              value={values.username}
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

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="flex justify-center py-4">
              <CustomButtons name={"Sign Up"} type="submit" />
            </div>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onToggle}
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Login
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};
