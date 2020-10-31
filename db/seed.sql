INSERT INTO user
    (username, email, password)
VALUES
    ("Mario_viana", "marioviana07@gmail.com", "password12345");

INSERT INTO post
    (title, post_text, user_id, created_at, update_at)
VALUES
    ("Test for post creation", "https://testwebsite.com", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO comment
    (comment_text, user_id, post_id, created_at, updated_at)
VALUES
    ("Test for comment creation", 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
