const axios = require("axios").default;

let headers = {
  "Content-Type": "application/json",
  Authorization: "52718_071571f9f35dd848540253f953c137d9",
};

const instance = axios.create({
  baseURL: "https://api2.isbndb.com",
  headers: headers,
});

const searchBar = document.getElementById("search-bar");
const resultsContainer = document.getElementById("results-container");
const bookUnavailableTxt = document.getElementById("book-unavailable-txt");

let bookList;
let searchValue;
let searchedBooks;

const fetchBooks = async () => {
  try {
    const response = await instance.post(
      "/books",
      "isbns=0452284236,2266154117,2842281500"
    );
    bookList = response.data;
    localStorage.setItem("bookData", JSON.stringify(bookList));
    localStorage.setItem("cacheTimestamp", Date.now());
    renderBooks(bookList);
  } catch (error) {
    bookUnavailableTxt.innerHTML =
      "An error occurred while fetching books. <br /> Please try again later.";
    bookUnavailableTxt.style.display = "block";
    console.error(error);
  }
};

const renderBooks = (books) => {
  resultsContainer.innerHTML = "";
  bookUnavailableTxt.style.display = "none";
  searchedBooks = [];

  books.forEach((book) => {
    resultsContainer.innerHTML += `
            <div class="book">
                <h2>${book.title}</h2>
                <p>${book.author}</p>
                <p>${book.year}</p>
            </div>
        `;
    searchedBooks.push(book);
  });
};

const expirationDuration = 21600000; // 6 hours
const cacheTimestamp = localStorage.getItem("cacheTimestamp");

if (
  !cacheTimestamp ||
  Date.now() - parseInt(cacheTimestamp) > expirationDuration
) {
  fetchBooks();
} else {
  bookList = JSON.parse(localStorage.getItem("bookData"));
  renderBooks(bookList);
}

searchBar.addEventListener("input", (e) => {
  searchValue = e.target.value.trim().toLowerCase();
  const filteredBooks = bookList.filter((book) =>
    book.title.toLowerCase().includes(searchValue)
  );

  const submit = document.getElementById("submitButton");
    submit.addEventListener("click", function () {
        renderBooks(filteredBooks);
        console.log("clicked");
    });

//   renderBooks(filteredBooks);

  if (searchedBooks.length <= 0) {
    bookUnavailableTxt.innerHTML = "Uh Oh! <br /> No books found.";
    bookUnavailableTxt.style.display = "block";
  }
});

module.exports = { fetchBooks, renderBooks };