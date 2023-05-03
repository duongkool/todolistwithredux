import "./login.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      document.cookie = "auth=true; expires; path=/;";
    },
  });
  return (
    <>
      <div className="form-container">
        <h3>FORM LOGIN</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            onChange={formik.handleChange}
            value={formik.values.userName}
            style={
              formik.errors.userName && formik.touched.userName
                ? { border: "1px solid red" }
                : {}
            }
          />
          {formik.errors.userName && formik.touched.userName && (
            <p> *{formik.errors.userName}</p>
          )}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            style={
              formik.errors.password && formik.touched.password
                ? { border: "1px solid red" }
                : {}
            }
          />
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
export default Login;
