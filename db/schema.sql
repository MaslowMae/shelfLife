CREATE DATABASE shelfie.db;
USE shelfie.db;

--users come to the site, sign in and create posts about books. 
CREATE TABLE users (
    user_id INT NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email STRING NOT NULL,
    password STRING NOT NULL,
    state STATE NOT NULL,
    zipcode INT NOT NULL VARCHAR(5)
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
);

-- may not need this table because users post ABOUT books and input the ISBN which can be used to feed into its own table. 
CREATE TABLE books (
    books_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    genre VARCHAR(20) NOT NULL,
    isbn INT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
);

--users create posts about books. 
CREATE TABLE posts (
    id INT NOT NULL,
    username VARCHAR(20) NOT NULL,
    topic  VARCHAR(50) NOT NULL,
    input  TEXT NOT NULL,
    isbn INT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

);
--users can comment on posts. 
CREATE TABLE comments (
    id INT NOT NULL,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
);