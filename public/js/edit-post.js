// this edit-post.js file is used to edit the post in the database and update the post in the database
const editFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const post_title = document.getElementById("post-title").value;
    const post_body = document
      .querySelector('textarea[name="post-body"]')
      .value.trim();

    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ post_title, post_body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to edit post");
    }
  }
};

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
