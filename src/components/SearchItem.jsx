import { SearchIcon, ClearIcon } from "./icons/icons";
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
        : inputSearch !== null
        ? inputSearch.value
        : "";

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
      // Nếu đã có danh sách công việc nhưng không tìm được công việc phù hợp
      const arrayJobs = []; // mảng chứa tên công việc để so sánh
      Array.from(listGroup.children).forEach((li) => {
        const nameJob = li.children[1].value; // Tên từng công việc
        arrayJobs.push(nameJob);
        if (nameJob.includes(value)) {
          // Kiểm tra xem công việc trong danh sách có nằm trong từ khóa tìm kiếm không ?
          li.classList.remove("d-none");
        } else {
          li.classList.add("d-none");
        }
      });

      // So sanh kết quả tìm kiếm với với mảng công việc
      if (arrayJobs.indexOf(value) < 0)
        return notification({
          title: "Không thể tìm công việc!",
          text: "Không tồn tại công việc trong danh sách",
        });
    }
  }

  return (
    <form onSubmit={handleSumbit} className="search mb-4" autoComplete="off">
      <div className="form-group">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center w-100 position-relative">
            <input
              id="search"
              className="form-control m-auto text-light"
              type="text"
              name="search"
              placeholder="Search..."
              onChange={(e) => {
                e.target.value.length > 0
                  ? document
                      .querySelector(".clearSearch")
                      .classList.remove("d-none")
                  : document
                      .querySelector(".clearSearch")
                      .classList.add("d-none");

                // Khi người dùng xóa hết nội dung tìm kiếm
                if (e.target.value.length == 0 && listGroup !== null) {
                  Array.from(listGroup.children).forEach((li) => {
                    li.classList.remove("d-none");
                  });
                }
              }}
            />
            <div
              className="clearSearch position-absolute end-0 p-2 d-none"
              onClick={(e) => {
                e.target.classList.add("d-none");
                document.querySelector("#search").value = "";
              }}
            >
              <ClearIcon />
            </div>
          </div>

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
