import "./Create.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo } from "../../../redux/slices/todoSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      id: uuidv4(),
      name: "",
      description: "",
      dueDate: "",
      priority: "Low",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),
    }),
    onSubmit: (values) => {
      const newTodo = { ...values };
      dispatch(addNewTodo(newTodo));
      navigate("/");
    },
  });
  return (
    <>
      <div className="container">
        <button className="go-back" onClick={() => navigate("/")}>
          {" "}
          &lt; back
        </button>
        <h1>Todo List</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Add new task"
              style={
                formik.errors.name && formik.touched.name
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
          {formik.errors.name && formik.touched.name && (
            <p> *{formik.errors.name}</p>
          )}
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Enter task description"
            ></textarea>
          </div>
          <div className="form_infor">
            <div className="form-group-infor">
              <label htmlFor="due-date">Due Date</label>

              <input
                type="date"
                id="due-date"
                onChange={formik.handleChange}
                value={formik.values.dueDate}
                name="dueDate"
              />
            </div>
            <div className="form-group-infor">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                onChange={formik.handleChange}
                value={formik.values.priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <button className="create-submit" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};
export default Create;
