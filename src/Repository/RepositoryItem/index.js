import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Link from '../../Link';
import Button from '../../Button';
import '../style.css';
import REPOSITORY_FRAGMENT from '../fragments';

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const updateAddStar = (
  client, 
  { data : { addStar: { starrable: { id } } } }
) => {
  // 1. get the repository from the cache
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  // 2. update repository's stargazers count
  const totalCount = repository.stargazers.totalCount + 1;

  // 3. write the repository back to the cache
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data : {
      ...repository,              // leave the rest of the repository the same
      stargazers: {               // except for stargazers
        ...repository.stargazers, // leave the rest of stargazers the same
        totalCount,               // except for totalCount
      }
    }
  });
};

const updateRemoveStar = (
  client,
  { data : { removeStar: { starrable: { id } } } }
) => {
  // 1. Get the repository from the cache
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT
  });
  // 2. Update totalCount
  const totalCount = repository.stargazers.totalCount - 1;

  // 3. Write repository back to the cache
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount,
      }
    }
  });
}

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>

      <div>
        {/* First argument passed to Mutation's function inside render */}
        {/* props is the mutation function itself (defined in STAR_REPOSITORY) */} 
        {
          !viewerHasStarred ? (
          <Mutation 
            mutation={STAR_REPOSITORY} 
            variables={{ id }}
            update={updateAddStar}
          >
            {(addStar, { data, loading, error }) => (
              <Button 
                className="RepositoryItem-title-action"
                onClick={addStar}
              >
                {stargazers.totalCount} Stars
              </Button>
            )}
          </Mutation>
        ) : (
          <Mutation 
            mutation={UNSTAR_REPOSITORY} 
            variables={{ id }}
            update={updateRemoveStar}
          >
            {(removeStar, { data, loading, error }) => (
              <Button
                className="RepositoryItem-title-action"
                onClick={removeStar}
              >
                {stargazers.totalCount} Stars
              </Button>
            )}
          </Mutation>
        )
        }
        {/* TODO: implement updateSubscription mutation */}
      </div>
    </div>

    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {primaryLanguage && (
            <span>Language: {primaryLanguage.name}</span>
          )}
        </div>
        <div>
          {owner && (
            <span>
              Owner: <a href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default RepositoryItem;
