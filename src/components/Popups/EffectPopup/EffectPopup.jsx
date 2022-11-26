import React, { useState, useEffect } from "react";
import {
    taxEffects,
    communityChestEffects,
    chanceEffects,
} from "../../../models/tileEffects";
import { POPUP_TYPES } from "../../../models/popupTypes";
import "./styles.css";

const EffectPopup = ({ popupType, action }) => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [btnText, setBtnText] = useState("");

    useEffect(() => {
        let effect = "";
        switch (popupType) {
            case POPUP_TYPES.TAX:
                setTitle("Tax!");

                effect =
                    taxEffects[Math.floor(Math.random() * taxEffects.length)];

                setSubtitle(`For the next round :\n${effect}`);
                setBtnText("OK");
                break;
            case POPUP_TYPES.WINNER:
                break;
            case POPUP_TYPES.BANNED:
                break;
            case POPUP_TYPES.COMMUNITY_CHEST:
                setTitle("Community Chest!");

                effect =
                    communityChestEffects[
                        Math.floor(Math.random() * communityChestEffects.length)
                    ];

                setSubtitle(`For the next round :\n${effect}`);
                setBtnText("OK");
                break;
            case POPUP_TYPES.CHANCE:
                setTitle("Chance!");

                effect =
                    chanceEffects[
                        Math.floor(Math.random() * chanceEffects.length)
                    ];

                setSubtitle(`For the next round :\n${effect}`);
                setBtnText("OK");
                break;
            default:
                break;
        }
    }, []);

    return (
        <div className="steal-popup-container winner-character-container">
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <button
                className="choose-player-btn reload-btn"
                onClick={() => action()}
            >
                {btnText}
            </button>
        </div>
    );
};

export default EffectPopup;
