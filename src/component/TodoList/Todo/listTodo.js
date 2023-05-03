import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Button, Collapse, Modal } from "react-bootstrap";
import { removeTodo, editTodo } from "../../../redux/slices/todoSlice";

const TodoItem = (props) => {
  const dispatch = useDispatch();
  const { item } = props;
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [openIndex, setOpenIndex] = useState(item.id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formik = useFormik({
    initialValues: {
      id: item.id,
      name: item.name,
      description: item.description,
      dueDate: item.dueDate,
      priority: item.priority,
    },
    onSubmit: (values) => {
      dispatch(editTodo(values));
      setOpen(false);
    },
  });

  const handleOpenDetail = (id) => {
    if (openIndex === id) {
      setOpen(!open);
    }
  };
  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };
  return (
    <>
      <div className="item-todo" key={`todo-${item.id}`}>
        <div className="infor-todo">
          <span>{item.name}</span>
          <div>
            <Button
              className="btn btn-info"
              style={{ marginRight: "10px" }}
              onClick={() => handleOpenDetail(item.id)}
              aria-controls={`example-collapse-text-${item.id}`}
            >
              Detail
            </Button>
            <button onClick={() => setShow(true)} className="btn btn-success ">
              Remove
            </button>
          </div>
        </div>
        <Collapse in={open}>
          <div
            id={`example-collapse-text-${item.id}`}
            style={{ marginTop: "10px" }}
          >
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
                Update
              </button>
            </form>
          </div>
        </Collapse>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="text-center d-flex align-items-center justify-content-center">
          <h3>Remove</h3>
        </Modal.Body>
        <Modal.Body className="text-center d-flex align-items-center justify-content-center">
          Do you want to remove this task!
        </Modal.Body>
        <Modal.Body className="text-center d-flex align-items-center justify-content-center">
          This action will delete the task out of the to do list!
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleRemove(item.id)}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoItem;
