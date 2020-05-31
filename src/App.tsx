import React from 'react';
import { useQuery } from "react-query";
import './App.css';

interface RickAndMortyAPIResponse {
  characters: string;
  episodes: string;
  location: string;
}

const getPosts = async (): Promise<RickAndMortyAPIResponse> => {
  const response = await fetch(process.env.REACT_APP_API_BASE_URL);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  const { status: httpCode, statusText, url } = response;
  throw new Error(`${httpCode} | ${statusText} ${url}`);
};

function App() {
  const { status, data, error } = useQuery('base', getPosts);
  console.log(status, data, error);

  return (
    <div className="App">
    </div>
  );
}

export default App;
