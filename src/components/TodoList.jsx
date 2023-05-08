// eslint-disable-next-line no-unused-vars
import { useRef, useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "../index.css";
// eslint-disable-next-line react/prop-types, no-unused-vars
function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  const ulRef = useRef();
  return (
    <section
      id="wappItem"
      className="list todos mx-auto rounded overflow-auto scrollbar"
    >
      {
        // eslint-disable-next-line react/prop-types
        todos.length === 0 ? (
          <span
            className="d-flex justify-content-center align-items-center"
            style={{ height: "-webkit-fill-available" }}
          >
            No Todos
          </span>
        ) : (
          <ul id="listGroup" ref={ulRef} className="list-group text-light">
            {
              // eslint-disable-next-line react/prop-types
              todos.map((todo) => {
                return (
                  <TodoItem
                    {...todo}
                    key={todo.id}
                    // eslint-disable-next-line no-unused-vars
                    listJobs={(e) => {
                      var jobsUpdate = [];
                      // Handle lấy các dữ liệu update
                      document.querySelectorAll(".listItem").forEach((li) => {
                        const idUpdate = li.getAttribute("id");
                        const titleUpdate = li.querySelector(".content").value;
                        const completedUpdate = li.firstChild.checked;

                        jobsUpdate.push({
                          id: idUpdate,
                          title: titleUpdate,
                          completed: completedUpdate,
                        });
                        console.log("LOG__", titleUpdate, completedUpdate);
                      });
                      // Save local strage
                      localStorage.setItem("todos", JSON.stringify(jobsUpdate));
                    }}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                  />
                );
              })
            }
          </ul>
        )
      }
    </section>
  );
}
export default TodoList;
