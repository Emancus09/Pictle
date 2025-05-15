import { useState, useRef, useLayoutEffect } from "react";

function searchMovies(searchText: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDI2ZWE3MGMwNDQ0NjUwOWFhMjExODE3ZjA1MjdkNSIsIm5iZiI6MS43NDY0OTg2NjkxODU5OTk5ZSs5LCJzdWIiOiI2ODE5NzQ2ZDU1MGE5YjViYTNjMzc4OGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UAyM5ZWqpNdQomhty-4HlFn9MxBnN4MOzS_plJ6opOs'
    }
  };
      
  return fetch(`https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`, options)
    .then(res => res.json())
}

function SearchBar(props: {onSelectMovie: (id: string) => void}) {
  const [options, setOptions] = useState<{original_title: string, poster_path: string, id: string}[]>([]);
  const [lastSearch, setLastSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedElement = useRef<HTMLButtonElement>(null);

  if (!isLoading && lastSearch !== searchText) {
    setLastSearch(searchText);
    setIsLoading(true);
    console.log('searching');
    searchMovies(searchText)
      .then(res => {
        setIsLoading(false);
        //@ts-expect-error because
        setOptions(res.results);
        setFocusedIndex(0);
      })
  }

  const handleOnKeyDown = (key: string) => {
    switch(key) {
      case 'Enter':
        props.onSelectMovie(options[focusedIndex].id);
        break;
      case 'ArrowUp':
        setFocusedIndex( Math.max(0, focusedIndex - 1));
        break;
      case 'ArrowDown':
        setFocusedIndex( Math.min(options.length - 1, focusedIndex + 1));
        break;
    }
  }

  useLayoutEffect(() => {
    focusedElement.current?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
  });

  return (
    <div 
      className="w-full relative"
      onKeyDown={(e) => handleOnKeyDown(e.key)}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="absolute inset-3 flex items-center pointer-events-none">
          <svg 
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
      </div>
      <input 
        type="search" 
        id="search" 
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
        placeholder="Name a movie..."
        autoComplete="off"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <div 
        className="absolute flex flex-col items-stretch mt-1 z-1 w-full max-h-32 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300" 
        role="listbox" 
        data-hs-combo-box-output=""
      >
        {options.map((option, index) => 
          <button 
            className={`h-12 flex-none flex items-center gap-4 px-2 truncate ${index === focusedIndex ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-200'}`}
            key={index} 
            onClick={() => props.onSelectMovie(option.id)}
            ref={index === focusedIndex ? focusedElement : undefined}
          >
            <img
             className="h-8 w-8 rounded-lg"
             src={`https://image.tmdb.org/t/p/w500${option.poster_path}`}
             />
            {option.original_title}
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar;
