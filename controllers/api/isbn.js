// API to get book details by ISBN

let headers = {
    "Content-Type": 'application/json',
    "Authorization": '52718_071571f9f35dd848540253f953c137d9'
}

const axios = require('axios');
const apiKey = '52718_071571f9f35dd848540253f953c137d9'
// Function to fetch book cover by ISBN
async function fetchBookCoverByISBN(isbn, apiKey) {
    try {
        // Make request to ISBNdb API
        const response = await axios.get(`https://api2.isbndb.com/book/${isbn}`, {
            headers: {
                'Authorization': apiKey
            }
        });

        // Extract cover image URL from response data
        const coverImageURL = response.data.book.image;

        return coverImageURL;
    } catch (error) {
        console.error('Error fetching book cover:', error);
        return null;
    }
}

// Example usage
const isbn = 'YOUR_BOOK_ISBN';
fetchBookCoverByISBN(isbn, apiKey)
    .then(coverImageURL => {
        console.log('Cover image URL:', coverImageURL);
        // Use cover image URL as needed in your application
    })
    .catch(error => {
        console.error('Error:', error);
    });


// GET / book / `${ISBN}` HTTP / 1.1

// fetch('https://api2.isbndb.com/book/9781934759486', {headers: headers})
//     .then(response =&gt; {
//         return response.json();
//     })
//     .then(json =&gt; {
//         console.log(json)
//     })
//     .catch(error =&gt; {
//         console.error('Error:', error)
//     });