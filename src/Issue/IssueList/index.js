import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import IssueItem from '../IssueItem';
import Loading from '../../Loading';
import ErrorMessage from '../../Error';

import './style.css';

const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryOwner: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5) {
        edges {
          node {
            id
            number
            state
            title
            url,
            bodyHTML
          }
        }
      }
    }
  }
`;

const Issues = ({
  repositoryOwner,
  repositoryName,
}) => (
  <div className="Issues">
    <Query
      query={GET_ISSUES_OF_REPOSITORY}
      variables={{
        repositoryOwner,
        repositoryName,
      }}
    >
      {({ data, loading, error }) => {
        if (error) {
          return <ErrorMessage error={error} />
        }

        const { repository } = data;

        if (loading && !repository) {
          return <Loading />;
        }

        if (repository.issues.edges.lenth === 0) {
          return <div className="IssueList">No Issues</div>;
        }

        return <IssueList issues={repository.issues} />
      }}
    </Query>
  </div>
);

const IssueList = ({ issues }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node}/>
    ))}
  </div>
)

export default Issues;