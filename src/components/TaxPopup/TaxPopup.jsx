import React, { useState, useEffect } from "react";
import { taxEffects } from "../../models/taxEffects";
import "./styles.css";

const EffectPopup = ({ acceptPopup }) => {
    const [effect, setEffect] = useState("");

    useEffect(() => {
        setEffect(taxEffects[Math.floor(Math.random() * taxEffects.length)]);
    }, []);

    return (
        <div className="steal-popup-container winner-character-container">
            <h2>Tax!</h2>
            <p>{`For the next round :\n${effect}`}</p>
            <button
                className="choose-player-btn reload-btn"
                onClick={() => acceptPopup()}
            >
                OK
            </button>
        </div>
    );
};

export default EffectPopup;
