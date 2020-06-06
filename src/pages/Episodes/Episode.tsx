import React, { FC } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { EpisodeSchema } from './Episodes';

const getEpisodeById = async (_: string, episodeId: number): Promise<EpisodeSchema> => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + `episode/${episodeId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    const { status: httpCode, statusText, url } = response;
    throw new Error(`${httpCode} | ${statusText} ${url}`);
}

const Episode: FC = () => {
  const { id } = useParams();

  const { status, data, error } = useQuery(['episode', id], getEpisodeById);

  if (status === 'loading') {
      return (<div>Loading</div>);
    }
  
  if (status === 'error' || data === undefined) {
    return (<div>Error: {error}</div>);
  }

  return (
    <div className="container">
      Episode {data.name} | {data.episode}<br/>
      Air Date {data.air_date}<br />
      Characters that appear on the episode: <br/>
      <ul>
        {data.characters.map(character => (<li>{character}</li>))}
      </ul>
    </div>
  );
}

export default Episode;

