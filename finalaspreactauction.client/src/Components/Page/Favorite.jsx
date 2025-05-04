import { useEffect, useState } from "react"
import axios from 'axios'
const Favorites = ({ userId }) => {
    const [car, setCar] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7038/api/Favorite/GetAll?${userId}`, {
            params: { userId: userId }
        }).
            then((res) => setCar(res.data))
    })

    return (
        <>
            {car.map((favCar) => (
                <h2>{favCar.carId}</h2>
            ))}
        </>
    )
}

export default Favorites