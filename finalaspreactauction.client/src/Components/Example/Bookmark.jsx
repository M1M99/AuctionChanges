import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Tooltip } from "@mui/material";

const BookmarkToggle = ({ carId, userId }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const response = await axios.get(`https://localhost:7038/api/Favorite?userId=${userId}&carId=${carId}`);

                if (response.data && response.status === 200) {
                    setIsFavorited(true);
                    console.log(response.data);
                } else {
                    setIsFavorited(false);
                    console.log(response);
                }
            } catch (error) {
                setIsFavorited(false);
                console.error("Error checking favorite status", error);
            }
        };

        checkFavoriteStatus();
    }, [userId, carId]);

    const addToFavorites = async () => {
        try {
            const response = await axios.post(`https://localhost:7038/api/Favorite?userId=${userId}&carId=${carId}`);
            if (response.status === 200) {
                setIsFavorited(true);
            }
        } catch (error) {
            console.error("Error adding to favorites", error);
        }
    };

    const removeFromFavorites = async () => {
        try {
            const response = await axios.delete(`https://localhost:7038/api/Favorite?userId=${userId}&carId=${carId}`);
            if (response.status === 200) {
                setIsFavorited(false);
            }
        } catch (error) {
            console.error("Error removing from favorites", error);
        }
    };

    return (
        <StyledWrapper>
            <Tooltip title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}>
                <label className="ui-bookmark">
                    <input
                        type="checkbox"
                        checked={isFavorited}
                        onChange={isFavorited ? removeFromFavorites : addToFavorites}
                    />
                    <div className="bookmark">
                        <svg viewBox="0 0 32 32">
                            <g>
                                <path
                                    d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"
                                    fill={isFavorited ? "yellow" : "rgb(77, 77, 77)"}
                                />
                            </g>
                        </svg>
                    </div>
                </label>
            </Tooltip>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .ui-bookmark {
        --icon-size: 24px;
        --icon-secondary-color: rgb(77, 77, 77);
        --icon-hover-color: rgb(97, 97, 97);
        --icon-primary-color: gold;
        --icon-circle-border: 1px solid var(--icon-primary-color);
        --icon-circle-size: 35px;
        --icon-anmt-duration: 0.3s;
    }

    .ui-bookmark input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: none;
    }

    .ui-bookmark .bookmark {
        width: var(--icon-size);
        height: auto;
        cursor: pointer;
        transition: 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        transform-origin: top;
    }

    .ui-bookmark:hover .bookmark {
        fill: var(--icon-hover-color);
    }

    .ui-bookmark input:checked + .bookmark {
        fill: var(--icon-primary-color);
        animation: bookmark var(--icon-anmt-duration) forwards;
    }

    @keyframes bookmark {
        50% {
            transform: scaleY(0.6);
        }

        100% {
            transform: scaleY(1);
        }
    }
`;

export default BookmarkToggle;
