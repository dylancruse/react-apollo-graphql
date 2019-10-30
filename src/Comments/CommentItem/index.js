import React from 'react';

import './style.css';

const CommentItem = ({
  author,
  body,
  commit,
  publishedAt,
}) => {
  const date = new Date(publishedAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return (
    <div className="CommentItem">
      <div className="CommentItem-info">
        <p><span className="CommentItem-info-span">{'User: '}</span>{author.login}</p>
        <p><span className="CommentItem-info-span">{'On Commit: '}</span>{commit.message}</p>
        <p>
          <span className="CommentItem-info-span">{'Created: '}</span>
          {month}{'-'}{day}{'-'}{year}
        </p>
      </div>
      <p><span className="CommentItem-info-span">{'Text: '}</span>{body}</p>
    </div>
  );
};

export default CommentItem;