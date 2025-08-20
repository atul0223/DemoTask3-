export default function MovieCard({ movie }: { movie: any }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : '/no-image.png';

  return (
    <div className="bg-white shadow-md rounded overflow-hidden p-4 text-center text-black">
      <img
        src={imageUrl}
        alt={movie.title}
        className="mx-auto mb-2 rounded"
      />
      <h3 className="text-sm font-semibold">{movie.title}</h3>
    </div>
  );
}