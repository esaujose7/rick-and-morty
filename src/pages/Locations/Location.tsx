import React, { FC } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { LocationSchema } from './Locations';

const getLocationById = async (_: string, episodeId: number): Promise<LocationSchema> => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + `location/${episodeId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    const { status: httpCode, statusText, url } = response;
    throw new Error(`${httpCode} | ${statusText} ${url}`);
}

const Location: FC = () => {
  const { id } = useParams();

  const { status, data, error } = useQuery(['location', id], getLocationById);

  if (status === 'loading') {
      return (<div>Loading</div>);
    }
  
  if (status === 'error' || data === undefined) {
    return (<div>Error: {error}</div>);
  }

  return (
    <div className="container">
      Location: {data.name}
    </div>
  );
}

export default Location;
