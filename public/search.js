const axios = require("axios").default;

// Define the ISBNdb API URL
const isbnUrl = "https://api2.isbndb.com/book/9781934759486";
// Define headers with the required authorization
const headers = {
  "Content-Type": "application/json",
  "Authorization": "52718_071571f9f35dd848540253f953c137d9"
}; 

// Make a GET request to the ISBNdb API
axios.get(isbnUrl, {
  headers: isbnHeaders
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error fetching book details:', error);
});

// Define the URL for fetching books based on search parameters
const searchUrl = "https://book-database1.p.rapidapi.com/books/string";
const searchHeaders = {
  "Content-Type": "application/json",
  "Authorization": "YOUR_RAPIDAPI_KEY" // Replace with your actual key
}; 

// Function to fetch books based on search parameters
const fetchBooks = async () => {
    try {
        const response = await axios.get(searchUrl, {
            headers: searchHeaders,
            params: {
                page: 1,
                pageSize: 20,
                column: "title",
                year: 2024,
                edition: 11
            }
        });
        const bookList = response.data;
        localStorage.setItem("bookData", JSON.stringify(bookList));
        localStorage.setItem("cacheTimestamp", Date.now());
        renderBooks(bookList);
    } catch (error) {
        console.error('Error fetching books:', error);
        // Handle error as needed
    }
};

// Function to fetch book details by title
const fetchBookDetailsByTitle = async (title) => {
  try {
      const response = await axios.get(isbnUrl, {
          headers: isbnHeaders,
          params: {
              q: title
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching book details:', error);
      throw error;
  }
};

// Function to render books in the DOM
const renderBooks = (books) => {
    // Implementation to render books in the DOM
    // Ensure that resultsContainer, bookUnavailableTxt, and searchedBooks are defined
};

// Function to render book details in the DOM
const renderBookDetails = (bookDetails) => {
  // Get the template source
  const templateSource = document.getElementById('book-template').innerHTML;
  // Compile the template
  const template = Handlebars.compile(templateSource);
  // Render the book details using the template
  const html = template(bookDetails);
  // Update the DOM element with the rendered HTML
  document.getElementById('book-container').innerHTML = html;
};

// Example usage (assuming you have an input field with id 'search-bar' and a button with id 'search-button')
document.getElementById('search-button').addEventListener('click', async () => {
  const title = document.getElementById('search-bar').value;
  try {
      const bookDetails = await fetchBookDetailsByTitle(title);
      renderBookDetails(bookDetails);
  } catch (error) {
      console.error('Error:', error);
      // Handle error as needed (e.g., show error message to the user)
  }
});
// Check if cached data exists and render it if not expired
const expirationDuration = 21600000; // 6 hours
const cacheTimestamp = localStorage.getItem("cacheTimestamp");

if (!cacheTimestamp || Date.now() - parseInt(cacheTimestamp) > expirationDuration) {
    fetchBooks();
} else {
    const bookList = JSON.parse(localStorage.getItem("bookData"));
    renderBooks(bookList);
}

// Event listener for input changes
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", (e) => {
    // Implement search functionality
});

// Event listener for button click
const submit = document.getElementById("submitButton");
submit.addEventListener("click", function () {
    // Implement button click functionality
});