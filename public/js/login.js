const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form

  const userName = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (user && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ user, email, password }),
      headers: { "Content-Type": "application/json" },
    });
  }

  if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace("/api/users/profile");
    alert("You are now logged in");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
