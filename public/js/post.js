const postFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#comment-input").value.trim();
  //Please double check these routes
  if (content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    // Not sure if these routes are correct
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#comment-form")
  .addEventListener("submit", postFormHandler);
