import { AddIcon, ClearIcon } from "./icons/icons";
import { useState } from "react";
import tippy from "tippy.js";
import notification from "./notification/notification";
import "tippy.js/dist/tippy.css"; // import CSS để tippyjs hoạt động
import "../index.css";

// eslint-disable-next-line react/prop-types
function NewTodoForm({ onSubmit }) {
  // onSubmit một hàm xử lý để lấy ra danh sách mảng các công việc
  const [newItem, setNewItem] = useState(""); // Giá trị người dùng nhập liệu

  function handleSumbit(e) {
    // Ngăn sự kiện gửi đi khi nhấn nút "Add"
    e.preventDefault();

    // if (newItem === "") return; // Nếu giá trị ô nhập bằng rỗng thì sẽ kết thúc hàm
    if (newItem === "") {
      e.type == "submit"
        ? notification({
            title: "Không thể thêm công việc!",
            text: "Vui lòng bạn nhập công việc trước khi thêm công việc mới",
          })
        : document.getElementById("item").focus();
    } else {
      onSubmit(newItem); // truyền props vào hàm onSubmit để lấy được title mà người dùng nhập liệu
      setNewItem(""); // sét giá trị ô nhập == "" khi người dùng app một công việc mới
    }
  }

  tippy(".addTodo", {
    content: "Create a task",
    placement: "top",
  });

  return (
    <form onSubmit={handleSumbit} className="add mt-4 mb-2" autoComplete="off">
      <div className="form-group">
        {/* <label className="text-light mb-3">Create a task</label> */}
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center w-100 position-relative">
            <input
              id="item"
              className="form-control text-light"
              name="task"
              type="text"
              placeholder="Enter a task..."
              value={newItem}
              onChange={(e) => {
                e.target.value.length > 0
                  ? document
                      .querySelector(".clearAdd")
                      .classList.remove("d-none")
                  : document.querySelector(".clearAdd").classList.add("d-none");
                setNewItem(e.target.value);
              }}
            ></input>
            <div
              className="clearAdd position-absolute end-0 p-2 d-none"
              onClick={(e) => {
                e.target.classList.add("d-none");
                document.querySelector("#item").value = "";
              }}
            >
              <ClearIcon />
            </div>
          </div>

          <span className="addTodo ms-2 my-element" onClick={handleSumbit}>
            <AddIcon />
          </span>
        </div>
      </div>
    </form>
  );
}

export default NewTodoForm;
