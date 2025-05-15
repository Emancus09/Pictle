import { useState } from 'react'

function MovieCard(props: {movieId: string}) {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDate, setMovieDate] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  const [movieCountryOfOrigin, setMovieCountryOfOrigin] = useState('');
  const [movieThumbnail, setMovieThumbnail] = useState('https://placehold.co/600x400');
  const [movieDirector, setMovieDirector] = useState('');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDI2ZWE3MGMwNDQ0NjUwOWFhMjExODE3ZjA1MjdkNSIsIm5iZiI6MS43NDY0OTg2NjkxODU5OTk5ZSs5LCJzdWIiOiI2ODE5NzQ2ZDU1MGE5YjViYTNjMzc4OGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UAyM5ZWqpNdQomhty-4HlFn9MxBnN4MOzS_plJ6opOs'
    }
  };

  fetch(`https://api.themoviedb.org/3/movie/${props.movieId}?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setMovieThumbnail(`https://image.tmdb.org/t/p/w500${res.poster_path}`);
      setMovieTitle(res.title);
      setMovieDate(res.release_date);
      setMovieGenre(res.genres[0].name);
      setMovieCountryOfOrigin(res.origin_country[0]);
    })
    .catch(err => console.error(err));
    
    fetch(`https://api.themoviedb.org/3/movie/${props.movieId}/credits?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setMovieDirector(res.crew.find(e => e.job==='Director').name);
      })
      .catch(err => console.error(err));

  return (
    <div className='w-128 flex gap-4 p-4'>
      <div className='flex-1/2 flex flex-col gap-4'>
        <div className='h-20 bg-gray-300 rounded text-center content-center'>{movieTitle}</div>
        <img className="h-68 bg-gray-300 rounded object-contain" src={movieThumbnail}/>
      </div>
      <div className='flex-1/2 flex flex-col gap-4'>
        <div className='h-20 bg-gray-300 rounded text-center content-center'>{movieDirector}</div>
        <div className='h-20 bg-gray-300 rounded text-center content-center'>{movieDate}</div>
        <div className='h-20 bg-gray-300 rounded text-center content-center'>{movieGenre}</div>
        <div className='h-20 bg-gray-300 rounded text-center content-center'>{movieCountryOfOrigin}</div>
      </div>
    </div>
  )
}

export default MovieCard
