import React from 'react';

import './style.css';

const CommentItem = ({
  author,
  body,
  commit,
  publishedAt,
}) => (
  <div className="CommentItem">
    <div className="CommentItem-info">
      <p><span className="CommentItem-info-span">{'User: '}</span>{author.login}</p>
      <p><span className="CommentItem-info-span">{'Commit: '}</span>{commit.message}</p>
      <p><span className="CommentItem-info-span">{'Published At: '}</span>{publishedAt}</p>
    </div>
    <p><span className="CommentItem-info-span">{'Text: '}</span>{body}</p>
  </div>
);

export default CommentItem;