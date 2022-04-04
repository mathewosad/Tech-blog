const commentFormHandler = async function (event) {
    event.preventDefault();

    // this is the post id that is being passed in from the form
    const postId = document.querySelector('input[name="post-id"]').value;
    // this is the comment body that is being passed in from the form
    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (body) {
        // this is the comment model that is being passed in from the form
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });// this aysnc await is not needed here, but it is needed in the fetch call
        const commentFormHandler = async (event) => {
          event.preventDefault();
        
          const comment_body = document
            .querySelector('textarea[name="comment-body"]')
            .value.trim();
        
          const post_id = window.location.toString().split("/")[
            window.location.toString().split("/").length - 1
          ];
        
          if (comment_body) {
            const response = await fetch("/api/comments", {
              method: "POST",
              body: JSON.stringify({
                post_id,
                comment_body,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            if (response.ok) {
              document.location.reload();
            } else {
              alert("Failed to comment.");
            }
          }
        }
        
        document
          .querySelector(".comment-form")
          .addEventListener("submit", commentFormHandler);
        

        document.location.reload();
    }
};

document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);