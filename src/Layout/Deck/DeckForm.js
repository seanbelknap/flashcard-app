import { Link } from "react-router-dom";

export default function DeckForm({ handleChange, handleSubmit, deck }) {
    const path=(deck.id ? `/decks/${deck.id}` : '/')

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <lable htmlFor="name">Name</lable>
        <input
          id="name"
          type="text"
          name="name"
          className="form-control"
          onChange={handleChange}
          value={deck.name}
          placeholder="Deck Name"
        />
      </div>
      <div className="form-group">
        <lable htmlFor="description">Descritption</lable>
        <textarea
          id="description"
          type="text"
          name="description"
          className="form-control"
          onChange={handleChange}
          value={deck.description}
          placeholder="Description"
        />
      </div>

      <button className="btn btn-primary">Submit</button>
      <Link to={path} className="btn btn-secondary">
        Cancel
      </Link>
    </form>
  );
}
