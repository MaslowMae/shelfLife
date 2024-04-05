// API to get book details by ISBN

let headers = {
    "Content-Type": 'application/json',
    "Authorization": '52718_071571f9f35dd848540253f953c137d9'
}

GET /book/`${ISBN}` HTTP/1.1
 
fetch('https://api2.isbndb.com/book/9781934759486', {headers: headers})
    .then(response =&gt; {
        return response.json();
    })
    .then(json =&gt; {
        console.log(json)
    })
    .catch(error =&gt; {
        console.error('Error:', error)
    });