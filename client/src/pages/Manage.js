import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Manage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ title: "", year: "", rating: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOne() {
      if (!id) return;
      setLoading(true);
      const res = await fetch(`/api/movies/${id}`);
      const data = await res.json();
      setForm({
        title: data.title,
        year: String(data.year),
        rating: String(data.rating),
      });
      setLoading(false);
    }
    fetchOne();
  }, [id]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      year: Number(form.year),
      rating: Number(form.rating),
    };
    if (isEdit) {
      await fetch(`/api/movies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    navigate("/");
  }

  if (loading) return <p>Loading…</p>;

  return (
    <>
      <h1>{isEdit ? "Edit Movie" : "Add Movie"}</h1>
      <form onSubmit={onSubmit}>
        <label>Title</label>
        <input name="title" value={form.title} onChange={onChange} required />

        <label>Year</label>
        <input
          name="year"
          type="number"
          value={form.year}
          onChange={onChange}
          required
        />

        <label>Rating (0–10)</label>
        <input
          name="rating"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={form.rating}
          onChange={onChange}
          required
        />

        <div className="actions">
          <button type="submit">{isEdit ? "Save" : "Create"}</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
