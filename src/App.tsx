import { useState } from 'react';
import MovieCard from './movie-card';

function App() {
  const [searchText, setSearchText] = useState('');

  const [movieIds, setMovieIds] = useState<string[]>([]);

  const onEnterKeyDown = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDI2ZWE3MGMwNDQ0NjUwOWFhMjExODE3ZjA1MjdkNSIsIm5iZiI6MS43NDY0OTg2NjkxODU5OTk5ZSs5LCJzdWIiOiI2ODE5NzQ2ZDU1MGE5YjViYTNjMzc4OGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UAyM5ZWqpNdQomhty-4HlFn9MxBnN4MOzS_plJ6opOs'
      }
    };
        
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setMovieIds([res.results[0].id, ...movieIds]))
      .catch(err => console.error(err));
  }

  return (
    <div className='flex flex-col items-center gap-4 p-8 w-fit m-auto'>
      <div className='bg-gray-100 rounded flex flex-row p-4 gap-4 w-full'>
        <label htmlFor="movie-search">Name a movie:</label>
        <input type="search" id="movie-search" name="q" className='flex-grow' onChange={(e) => setSearchText(e.target.value)} value={searchText} onKeyDown={(e) => {if (e.key === 'Enter') onEnterKeyDown()}}/>
      </div>
      {movieIds.map(id => <MovieCard movieId={id} key={id}/>)}
    </div>
  )
}

export default App
