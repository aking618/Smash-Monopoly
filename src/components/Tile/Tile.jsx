import "./styles.css";

const Tile = ({
  strip = true,
  top = false,
  left = false,
  right = false,
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
      />
      <div className="marker-container">
        <div className={`${player1Pos ? "p1-marker" : ""} player-marker`} />
        <div className={`${player2Pos ? "p2-marker" : ""} player-marker`} />
      </div>
    </div>
  );
};

export default Tile;
