// this is the newFormHandler function is called when the user clicks the submit button.  It will create a new post and comment.
const newFormHandler = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector("#post-title").value.trim();
  const post_body = document.querySelector("#post-body").value.trim();

  if (post_title && post_body) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ post_title, post_body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};



document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);