function Card({ img, flipped, onclick }) {
  return (
    <div className={`card ${flipped ? "toggleCard" : ""}`} onClick={onclick}>
      <img className="face" src={img} />
      <div className="back"></div>
    </div>
  );
}

export default Card;
