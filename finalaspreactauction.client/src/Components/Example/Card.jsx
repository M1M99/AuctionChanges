import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
const Card = ({ car, getMakeName, getModelName }) => {
    const nav = useNavigate();
    const handlePage = () => {
        nav(`/car/${car.id}`)
    }
    return (
        car && 
        <StyledWrapper onClick={ handlePage }>
            <CardWrapper>
                <CardContent>
                    <img
                        className="img"
                        src={car.imageUrl || "https://via.placeholder.com/150"}
                        alt={getModelName(car.modelId)}
                    />
                    <p>{getMakeName(car.makeId)}</p>
                    <p>{getModelName(car.modelId)}</p>
                    <p>{car.year}</p>
                </CardContent>
            </CardWrapper>
        </StyledWrapper>
    );
};


const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CardWrapper = styled.div`
  width: 290px;
  height: 304px;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all .3s;

  &:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all .2s;

      cursor:pointer;
  &:hover {
    transform: scale(0.98);
  }

  img {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    color: white;
    margin: 5px 0;
  }
`;

export default Card;
