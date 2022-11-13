import "./styles.css";

const BannedPopup = ({ ctx, acceptPopup }) => {
  return (
    <div className="steal-popup-container banned-popup">
      <div className="banned-popup__content">
        <h1 className="banned-popup__title">You are banned</h1>
        <p className="banned-popup__text">
          You must win a game with Steve to leave.
        </p>
        <button
          className="banned-popup-btn choose-player-btn reload-btn"
          onClick={acceptPopup}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default BannedPopup;
