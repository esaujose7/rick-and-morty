import React, { FC } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { EpisodeSchema } from './Episodes';
import { retrieve, RetrieverFunction } from '../../retrieve';

const Episode: FC = () => {
  const { id } = useParams();

  const fetchEpisodeById: RetrieverFunction<EpisodeSchema> = retrieve;
  const { status, data, error } = useQuery(['episode', id], fetchEpisodeById);

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
