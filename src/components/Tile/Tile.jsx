import "./styles.css";

const Tile = ({
  strip = true,
  top = false,
  left = false,
  right = false,
  corner = false,
  stripColor,
  title,
  player1Pos,
  player2Pos,
  ownedBy = "",
}) => {
  let ownedColor = () => {
    if (ownedBy === "") {
      return "";
    }

    if (ownedBy === "0") {
      return "p1-owned";
    }

    if (ownedBy === "1") {
      return "p2-owned";
    }
  };
  return (
    <div
      className={`tile ${left ? "left" : ""} ${right ? "right" : ""} ${
        top ? "top" : ""
      } ${ownedColor()}`}
    >
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
      <img
        className={`tile-image  ${left ? "image-left" : ""} ${
          right ? "image-right" : ""
        }`}
        src={`images/${title.replace(/[^A-Z0-9]+/gi, "").toLowerCase()}.png`}
        alt={title}
      />
      <div
        className={`marker-container ${left ? "left-mark" : ""} ${
          right ? "right-mark" : ""
        } ${top ? "top-mark" : ""} ${
          player1Pos && player2Pos ? "both-marker" : ""
        } ${corner ? "corner-mark" : ""}`}
      >
        {player1Pos && (
          <img
            className="player-marker p1-marker"
            src="images/player0.png"
            alt="Player One"
          />
        )}
        {player2Pos && (
          <img
            className="player-marker p2-marker"
            src="images/player1.png"
            alt="Player One"
          />
        )}
      </div>
    </div>
  );
};

export default Tile;
