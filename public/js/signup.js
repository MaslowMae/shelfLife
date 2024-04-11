console.log("Attached");
const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#fName-signup").value.trim();
  const lastName = document.querySelector("#lName-signup").value.trim();
  const user = document.querySelector("#user-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  console.log("Hello");
  console.log(firstName, lastName, user, email, password);

  if (firstName && lastName && user && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, user, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
