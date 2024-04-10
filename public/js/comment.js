const commentFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const commentBody = document.querySelector('#new-comment').value.trim();
  
  
    if (commentBody) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ commentBody }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector("#comment-form")
  .addEventListener("submit", commentFormHandler)