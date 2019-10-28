import React from 'react';

import Link from '../../Link';

import './style.css';

const IssueItem = ({ issue }) => (
  <div className="IssueItem">
    {/* TODO Add show/hide comments button */}

    <div className="IssueItem-content">
      <h3>
        <Link href={issue.url}>{issue.title}</Link>
      </h3>
      <div dangerouslySetInnerHTML={{__html: issue.bodyHTML}}/>
    </div>
    
    {/* TODO Add list of comments */}
  </div>
);

export default IssueItem;