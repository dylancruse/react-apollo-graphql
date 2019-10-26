import React from 'react';

import './style.css';

const FetchMore = ({
  variables,
  updateQuery,
  fetchMore,
  children
}) => (
  <div className="FetchMore">
    <button
      type="button"
      className="FetchMore-button"
      onClick={() => fetchMore({ variables, updateQuery })}
    >
      More {children}
    </button>
  </div>
);

export default FetchMore;