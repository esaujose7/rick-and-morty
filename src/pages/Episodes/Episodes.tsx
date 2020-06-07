import React, { FC } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { ListingsResponse } from '../../types';
import { retrieve, RetrieverFunction } from '../../retrieve';

export interface EpisodeSchema {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

const Episodes: FC = () => {
  const fetchEpisodes: RetrieverFunction<ListingsResponse<EpisodeSchema>> = retrieve;
  const { status, data, error } = useQuery(['episode', undefined], fetchEpisodes);

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
              <li key={result.episode} className="column is-one-third has-text-centered">
                <Link to={`/episodes/${result.id}`}>
                  {result.episode}<br />
                  {result.name}<br />
                  {result.air_date}
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

export default Episodes
