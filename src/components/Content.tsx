import { useEffect, useState } from 'react';

import '../styles/content.scss';
import '../styles/global.scss';

import { api } from '../services/api';

import { Button } from '../components/Button';

import { MovieCard } from '../components/MovieCard';

import { SideBar } from '../components/SideBar';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content() {
  // Complete aqui
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
 

  useEffect(() => {
     api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    })
    }, [selectedGenreId]);

    

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
       <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>
   </div>
      <main>
      <div className="movies-list">
      {movies.map(movie => (
        <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
       ))}
     </div>
     </main>
     </div>
       )
}
