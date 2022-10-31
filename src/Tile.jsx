import "./styles.css";

const Tile = ({
  strip = true,
  left = false,
  right = false,
  stripColor,
  title,
  image,
  player1Pos,
  player2Pos,
}) => {
  return (
    <div className={`tile ${left ? "left" : ""} ${right ? "right" : ""}`}>
      {strip && (
        <div
          className={`strip strip-${stripColor} ${
            left || right ? "strip-side" : ""
          }`}
        />
      )}
      <p
        className={`tile-title ${left ? "text-left" : ""} ${
          right ? "text-right" : ""
        }`}
      >
        {title}
      </p>
      <div className="tile-image">{image}</div>
      <div className="marker-container">
        <div className={`${player1Pos ? "p1-marker" : ""} player-marker`} />
        <div className={`${player2Pos ? "p2-marker" : ""} player-marker`} />
      </div>
    </div>
  );
};

export default Tile;
