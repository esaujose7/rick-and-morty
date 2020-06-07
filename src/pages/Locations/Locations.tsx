import React, { FC } from 'react'
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { ListingsResponse } from '../../types';
import { CharacterSchema } from '../Characters/Characters';

export interface LocationSchema {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: CharacterSchema[];
  url: string;
  created: string;
}

const getLocations = async (): Promise<ListingsResponse<LocationSchema>> => {
  const response = await fetch(process.env.REACT_APP_API_BASE_URL + 'location');
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  const { status: httpCode, statusText, url } = response;
  throw new Error(`${httpCode} | ${statusText} ${url}`);
};

const Locations: FC = () => {
  const { status, data, error } = useQuery('locations', getLocations);

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
                <Link to={`/locations/${result.id}`}>
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

export default Locations
