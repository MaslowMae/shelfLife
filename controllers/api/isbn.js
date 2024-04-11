// API to get book details by ISBN
const axios = require('axios');
const express = require('express');
const router = express.Router();
const { Book } = require('../models');
const apiKey = '52718_071571f9f35dd848540253f953c137d9'

const bookDetails = {
    bookTitle: 'Book Title',
    Author: 'Author Name',
    Genre: 'Genre',
    coverImageURL: `https://api2.isbndb.com/book/${isbn}`,
    posts: [] // Assuming posts data is available
};
// Render the book details using Handlebars
const source = document.getElementById('book-template').innerHTML;
const template = Handlebars.compile(source);
const html = template(bookDetails);
document.getElementById('book-container').innerHTML = html;

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
const isbn = `${isbn}`;
fetchBookCoverByISBN(isbn, apiKey)
    .then(coverImageURL => {
        console.log('Cover image URL:', coverImageURL);
        // Use cover image URL as needed in your application
    })
    .catch(error => {
        console.error('Error:', error);
    });

