import { Link } from "react-router-dom";

export default function CardForm({ handleChange, handleSubmit, card, deck }) {
    const CancelDoneLink = (card.id ? 'Cancel' : 'Done');
    const SaveSubmitLink = (card.id ? 'Submit' : 'Save');

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <lable htmlFor="front">Front Side</lable>
        <textarea
          id="front"
          type="text"
          name="front"
          className="form-control"
          onChange={handleChange}
          value={card.front}
          placeholder="Front Side Of Card"
        />
      </div>
      <div className="form-group">
        <lable htmlFor="back">Back Side</lable>
        <textarea
          id="back"
          type="text"
          name="back"
          className="form-control"
          onChange={handleChange}
          value={card.back}
          placeholder="Back Side Of Card"
        />
      </div>

      <button className="btn btn-primary">{SaveSubmitLink}</button>
      <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
        {CancelDoneLink}
      </Link>
    </form>
  );
}
