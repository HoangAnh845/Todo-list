import { SearchIcon } from "./icons/icons";
import "../index.css";
import notification from "./notification/notification";
// eslint-disable-next-line react/prop-types
function SearchItem() {
  const inputSearch = document.querySelector("#search");
  const listGroup = document.querySelector("#listGroup");

  function handleSumbit(e) {
    console.log(inputSearch);
    const value =
      e.type == "submit"
        ? e.target.querySelector("#search").value
        : inputSearch.value;

    // Ngăn sự kiện gửi đi khi nhấn nút "Add"
    e.preventDefault();
    filterItems(value);
  }

  function filterItems(value) {
    // value: từ khóa tìm kiếm
    if (listGroup == null) {
      // nếu chưa có danh sách công việc trước đó mà người dùng vẫn tìm kiếm đưa ra thông báo
      notification({
        title: "Không thể tìm công việc!",
        text: "Hiện tại chưa có công việc nào được thêm",
      });
    } else {
      Array.from(listGroup.children).forEach((li) => {
        const nameJob = li.children[1].value; // Tên từng công việc
        if (nameJob.includes(value)) {
          // Kiểm tra xem công việc trong danh sách có nằm trong từ khóa tìm kiếm không ?
          li.classList.remove("d-none");
          console.log("1");
        } else {
          li.classList.add("d-none");
        }
      });
    }
  }

  return (
    <form onSubmit={handleSumbit} className="search mb-4" autoComplete="off">
      <div className="form-group">
        <div className="d-flex align-items-center">
          <input
            id="search"
            className="form-control m-auto text-light"
            type="text"
            name="search"
            placeholder="Search..."
            onChange={(e) => {
              console.log(e.target);
              // Khi người dùng xóa hết nội dung tìm kiếm
              if (e.target.value.length == 0 && listGroup !== null) {
                Array.from(listGroup.children).forEach((li) => {
                  li.classList.remove("d-none");
                });
              }
            }}
          />
          <span className="searchItem ms-2 my-element" onClick={handleSumbit}>
            <SearchIcon />
          </span>
        </div>
      </div>
    </form>
  );
}

export default SearchItem;

/* 
() => {
  const value = inputSearch.value.trim();
  // value: giá nhập vào
  // toLowerCase: chuyển đổi chuỗi sang ký tự viết thời
  // trim: loại bỏ khoảng trống
  handleSumbit(value);
}

*/
