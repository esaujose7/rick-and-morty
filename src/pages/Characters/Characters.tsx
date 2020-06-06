import React, { FC } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { ListingsResponse } from '../../types/common';

export interface CharacterSchema {
  id: number;
  name: string;
  species: string;
  gender: string;
  origin: object
  location: object;
  image: string;
  episode: string[]
  url: string;
  created: string;
}

const getCharacters = async (): Promise<ListingsResponse<CharacterSchema>> => {
  const response = await fetch(process.env.REACT_APP_API_BASE_URL + 'character');
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  const { status: httpCode, statusText, url } = response;
  throw new Error(`${httpCode} | ${statusText} ${url}`);
};

const Characters: FC = () => {
  const { status, data, error } = useQuery('character', getCharacters);

  if (status === 'loading') {
    return (<div>Loading</div>);
  }

  if (status === 'error' || data === undefined) {
    return (<div>Error: {error}</div>);
  }

  return (
    <>
      <ul className="columns is-multiline">
        {
          data.results.map(result => {
            return (
              <li key={result.id} className="column is-one-third has-text-centered">
                <Link to={`/characters/${result.id}`}>
                  {result.name}<br />
                </Link >
              </li>
            )
          })
        }
      </ul>
      <Pagination />
    </>
  );
}

export default Characters;
