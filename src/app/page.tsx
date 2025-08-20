"use client"
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        const data = await res.json();
        setMovies(data.results.slice(0, ITEMS_PER_PAGE));
      } catch (err) {
        setError('Failed to fetch movie data.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium">Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}