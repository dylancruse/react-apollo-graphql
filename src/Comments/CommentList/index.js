import React from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../../Loading';
import ErrorMessage from '../../Error';

import './style.css';

const GET_COMMENTS_OF_REPOSITORY = gql`
  query($repositoryName: String!, $repositoryOwner: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      commitComments(first: 5) {
        edges {
          node {
            id,
            author {
              login
            },
            body,
            commit {
              id
              message
            },
            publishedAt,
            lastEditedAt
          }
        }
      }
    }
  }
`;

const CommentList = ({ repositoryName, repositoryOwner }) => (
  <div className="Comments">
    <Query
      query={GET_COMMENTS_OF_REPOSITORY}
      variables={{ repositoryName, repositoryOwner }}
    >
      {({ data, loading, error}) => {
        if (error) {
          return <ErrorMessage error={error} />
        }
        
        const { repository } = data;

        if (loading && !repository) {
          return <Loading />;
        }

        return repository.commitComments.edges.map(({ node }) => (
          <div key={node.id}>{node.body}</div>
        ));
        
      }}
    </Query>
  </div>
);

export default CommentList;
