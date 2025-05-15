import { useState } from 'react';
import MovieCard from './movie-card';
import SearchBar from './search-bar';

function App() {
  const [movieIds, setMovieIds] = useState<string[]>([]);

  return (
    <div className='flex flex-col items-center gap-4 p-8 min-w-128 w-fit m-auto'>
      <SearchBar onSelectMovie={(movie) => setMovieIds([movie, ...movieIds])}/>
      {movieIds.map(id => <MovieCard movieId={id} key={id}/>)}
    </div>
  )
}

export default App
