const commentBox = () => {
    const commentForm = document.querySelector('[data-js-comment-form]');
    const currentUserImage = commentForm.querySelector('[data-js-current-user-image]');
    const comment = commentForm.querySelector('[data-js-textarea]');
    
    let comments = [];
   
    const addComment = () => {
        commentForm.addEventListener('submit', event => {
            event.preventDefault();
            const value = comment.value.trim();
        });
    }

    // displays all comments from the .json data
    const getComments = data => {
        const commentList = document.querySelector('[ data-js-comment-list]'); 
        const commentTemplate = document.querySelector('[data-js-comment-template]');
        const userComments = data.comments;

        comments = userComments.map(comment => {
            const card = commentTemplate.content.cloneNode(true).children[0];
            const commenterImage = card.querySelector('[data-js-user-image]');
            const commenterName = card.querySelector('[data-js-name]');
            const commentedTime = card.querySelector('[data-js-time]');
            const commenterComment = card.querySelector('[data-js-comment]');
            const commentScore = card.querySelector('[data-js-number]');
            const replies = comment.replies;

            const replyList = card.querySelector('[data-js-reply-list]');

            commenterImage.src = comment.user.image.png;
            commenterName.textContent = comment.user.username;
            commentedTime.textContent = comment.createdAt;
            commenterComment.textContent = comment.content;
            commentScore.textContent = comment.score;

            // if the comment contains replies, display it
            if ( replies.length > 0 ) {
                replies.map(reply => {
                    const card = commentTemplate.content.cloneNode(true).children[1];
                    const commenterImage = card.querySelector('[data-js-user-image]');
                    const commenterName = card.querySelector('[data-js-name]');
                    const commentedTime = card.querySelector('[data-js-time]');
                    const commenterComment = card.querySelector('[data-js-comment]');
                    const commentScore = card.querySelector('[data-js-number]');

                    commenterImage.src = reply.user.image.png;
                    commenterName.textContent = reply.user.username;
                    commentedTime.textContent = reply.createdAt;
                    commenterComment.textContent = reply.content;
                    commentScore.textContent = reply.score;
                    replyList.append(card);
                    
                });
            }
            else {
                replyList.classList.add('-hide');
            }
            commentList.append(card);
    
        });
    };

    const getCurrentUser = data => {
        const username = data.username;
        const { png } = data.image;

        commentForm.dataset.jsUsername = username;
        currentUserImage.src = png;
    };

    const fetchData = async () => {
        const response = await fetch('../../../data/data.json');
        const data = await response.json();
        const user = data.currentUser;
    
        getComments(data);
        getCurrentUser(user);
    };

    fetchData();
};

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') commentBox();
});