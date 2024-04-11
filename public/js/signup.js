console.log("Attached");
const signupFormHandler = async (event) => {
  event.preventDefault();

  // const firstName = document.querySelector("#fName-signup").value.trim();
  // const lastName = document.querySelector("#lName-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  // const state = document.querySelector("#state-signup").value.trim();
  // const zipcode = document.querySelector("#zip-signup").value.trim();

  console.log("Hello");
  console.log(username, email, password);

  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Success");
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
