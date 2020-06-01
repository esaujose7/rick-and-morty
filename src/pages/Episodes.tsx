import React, { FC } from 'react';
import { useQuery } from "react-query";

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

  const { results } = data;
  return (<ul className="columns is-multiline">
    {
      results.map(result => {
        return (
          <li key={result.episode} className="column is-one-third">
            {result.episode}<br />
            Fecha de estreno: {result.air_date}<br />
            {result.name}
          </li>
        )
      })
    }
    </ul>
  )
}

export default Episodes
