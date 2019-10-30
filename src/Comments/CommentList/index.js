import React from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../../Loading';
import ErrorMessage from '../../Error';
import CommentItem from '../CommentItem';

import './style.css';
import { ButtonUnobtrusive } from '../../Button';

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

class Comments extends React.Component {
  state = {
    showComments: false,
  }

  onCommentButtonClick = () => {
    console.log('clicked');
    this.setState({ showComments: !this.state.showComments })
  }

  render() {
    const { repositoryName, repositoryOwner } = this.props;
    const { showComments } = this.state;
    return (
      <div className="Comments-Wrapper">
        <ButtonUnobtrusive
          onClick={() => this.onCommentButtonClick()}
        >
          {showComments ? 'Hide' : 'Show'}{' '}Comments
        </ButtonUnobtrusive>
        {showComments && (
            <div className="Comments">
            <h3>Comments</h3>
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

                if(repository.commitComments.edges.length === 0) {
                  return <div>No Comments...</div>
                }

                return <CommentList repository={repository} />;
                
              }}
            </Query>
          </div>
        )}
      </div>
    );
  }
}

const CommentList = ({ repository }) => (
  repository.commitComments.edges.map(({ node }) => (
    <CommentItem key={node.id} {...node} />
  ))
);

export default Comments;
