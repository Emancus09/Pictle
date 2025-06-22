import { useState } from 'react';
import MovieCard from './movie-card';
import SearchBar from './search-bar';

function App() {
  const [movieIds, setMovieIds] = useState<string[]>([]);

  return (
    <div className='flex flex-row items-stretch gap-4 p-4 h-full max-w-256 mx-auto'>
      <div className='flex-grow'>
        <SearchBar onSelectMovie={(movie) => setMovieIds([movie, ...movieIds])}/>
      </div>
      <div className="flex-grow flex flex-col overflow-auto gap-2 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        {movieIds.map(id => <MovieCard movieId={id} key={id}/>)}
      </div>
    </div>
  )
}

export default App
