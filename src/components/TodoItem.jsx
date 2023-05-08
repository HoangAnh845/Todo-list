/* eslint-disable react/prop-types */
import { useRef } from "react";
import { EditIcon } from "./icons/icons";
import { DeleteIcon } from "./icons/icons";
// eslint-disable-next-line react/prop-types, no-unused-vars
function TodoItem({
  // eslint-disable-next-line react/prop-types
  completed,
  id,
  title,
  listJobs,
  toggleTodo,
  deleteTodo,
  editTodo,
}) {
  // Để tham chiếu đến một phần tử DOM hoặc một giá trị trong component.
  const todoRef = useRef();
  const jobItem = useRef();
  return (
    <li id={id} key={id} ref={jobItem} className="listItem list-group-item">
      <input
        style={{ cursor: "pointer" }}
        type="checkbox"
        defaultChecked={completed}
        onChange={(e) => {
          return toggleTodo(id, e.target.checked, todoRef, jobItem);
        }}
      />
      <input
        ref={todoRef}
        type="text"
        className={`content bg-transparent text-light ms-2 me-2 ps-2 pe-2 ${
          completed ? "text-decoration-line-through opacity-50" : ""
        }`}
        defaultValue={title}
        onBlur={listJobs} // focusout
        style={{
          width: "-webkit-fill-available",
          outline: "none",
          border: "none",
          pointerEvents: "none",
        }}
      />

      <span
        className="edit me-2 material-icons float-right"
        onClick={() => editTodo(id, completed, todoRef)}
      >
        <EditIcon />
      </span>
      <span
        className="delete material-icons float-right"
        onClick={() => deleteTodo(id, title)}
      >
        <DeleteIcon />
      </span>
    </li>
  );
}

export default TodoItem;
