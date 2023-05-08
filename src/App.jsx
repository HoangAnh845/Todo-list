import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import NewTodoForm from "./components/NewTodoForm";
import SearchItem from "./components/SearchItem";
import TodoList from "./components/TodoList";
import notification from "./components/notification/notification";
function App() {
  const jobLocal = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(jobLocal || []); // Chứa các mảng giá trị công việc

  // useEffect được gọi khi:
  // Khi component được render lần đầu tiên (mount): trong trường hợp này, useEffect sẽ được gọi sau khi component được render xong lần đầu tiên.
  // Khi một hoặc nhiều dependencies của useEffect thay đổi giá trị: trong trường hợp này, useEffect sẽ được gọi lại để thực hiện các side-effect tương ứng với sự thay đổi đó.
  // Nếu không có dependencies: trong trường hợp này, useEffect sẽ được gọi lại sau mỗi lần component được render lại.
  useEffect(() => {
    // Save local strage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // Thêm một todo mới vào danh sách
  // eslint-disable-next-line no-unused-vars
  function addTodo(title) {
    setTodos((currentTodos) => {
      const newJobs = [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];

      // Save local strage
      localStorage.setItem("todos", JSON.stringify(newJobs));
      return newJobs;
    });
  }

  // eslint-disable-next-line no-unused-vars
  function toggleTodo(id, completed, todoRef, jobItem) {
    if (completed == true) {
      // Nếu công việc được tích
      todoRef.current.classList.add("text-decoration-line-through");
      todoRef.current.classList.add("opacity-50");
    } else {
      // Nếu công việc không được tích
      todoRef.current.classList.remove("text-decoration-line-through");
      todoRef.current.classList.remove("opacity-50");
    }

    // Cập nhật công việc mới
    setTodos((currentTodos) => {
      // currentTodos mảng giá trị công việc
      return currentTodos.map((todo) => {
        // todo: là object thông tin công việc
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  // Xóa một todo khỏi danh sách
  // eslint-disable-next-line no-unused-vars
  function deleteTodo(id, title) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  // Chỉnh nội dung công việc
  // eslint-disable-next-line no-unused-vars
  function editTodo(id, completed, todoRef) {
    // Nếu công việc được tích
    if (completed == true) {
      notification({
        title: "Không thể sửa công việc!",
        text: "Công việc hiện tại đang được hoàn thành",
      });
    } else {
      todoRef.current.focus(); // in ra phần tử đang được tham chiếu
    }
  }

  // Trả về giao diện cho người dùng
  return (
    <>
      <div className="container">
        <section className="todo mt-5 mx-auto">
          <h1 className="text-light text-center mb-3 test">To-do list</h1>
          <NewTodoForm onSubmit={addTodo} />
          <SearchItem todos={todos} />
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </section>
      </div>
    </>
  );
}

export default App;
