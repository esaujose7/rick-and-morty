import React, { FC } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { Pagination } from '../components/Pagination';

interface InfoObjectAPI {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

interface EpisodeResultsObjectAPI {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

interface EpisodesResponseAPI {
  info: InfoObjectAPI;
  results: EpisodeResultsObjectAPI[];
}

const getEpisodes = async (): Promise<EpisodesResponseAPI> => {
  const response = await fetch(process.env.REACT_APP_API_BASE_URL + 'episode');
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  const { status: httpCode, statusText, url } = response;
  throw new Error(`${httpCode} | ${statusText} ${url}`);
};

const Episodes: FC = () => {
  const { status, data, error } = useQuery('episodes', getEpisodes);

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
  )
}

export default Episodes
