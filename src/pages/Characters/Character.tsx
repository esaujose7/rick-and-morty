import React, { FC } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { CharacterSchema } from './Characters';

const getCharacterById = async (_: string, episodeId: number): Promise<CharacterSchema> => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + `character/${episodeId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    const { status: httpCode, statusText, url } = response;
    throw new Error(`${httpCode} | ${statusText} ${url}`);
}

const Character: FC = () => {
  const { id } = useParams();

  const { status, data, error } = useQuery(['character', id], getCharacterById);

  if (status === 'loading') {
      return (<div>Loading</div>);
    }
  
  if (status === 'error' || data === undefined) {
    return (<div>Error: {error}</div>);
  }

  return (
    <div className="container">
      Character {data.name}<br/>
    </div>
  );
}

export default Character;