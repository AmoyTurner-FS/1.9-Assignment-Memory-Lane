import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this movie?")) return;
    await fetch(`/api/movies/${id}`, { method: "DELETE" });
    setMovies((prev) => prev.filter((m) => m._id !== id));
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (!movies || movies.length === 0)
    return (
      <>
        <h1>Movies</h1>
        <p>No movies yet.</p>
        <Link to="/manage">Add one</Link>
      </>
    );

  return (
    <>
      <h1>Movies</h1>
      <div className="actions">
        <Link to="/manage">Add Movie</Link>
      </div>

      {movies &&
        movies.map((m) => (
          <div className="card" key={m._id}>
            <strong>{m.title}</strong> — {m.year} — {m.rating}/10
            <div className="actions">
              <Link to={`/manage/${m._id}`}>Edit</Link>
              <button onClick={() => remove(m._id)}>Delete</button>
            </div>
          </div>
        ))}
    </>
  );
}
