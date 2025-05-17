import CarList from "./Components/Fetch/CarList"
import ModelList from "./Components/Fetch/ModelList"
import Auction from "./Components/Auction/AuctionHandle"
import ExitAnimation from "./Components/Example/Animation"
import Carousel from "./Components/Example/CarouselUI"
import ForAdmin from "./Components/Example/ForAdmin"
import Card from "./Components/Example/Card"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import VehiclesWonAtBit from "./Components/Fetch/WonAtBid"


function App() {
    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState(location.state?.alert || null);
    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => setAlertMessage(null), 2500);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);
    return (
        <div className="totalContainer" style={{ marginTop: "-25px" }}>
            {alertMessage && (
                <div className="alert alert-warning" role="alert" style={{ margin: "10px 20px" }}>
                    {alertMessage}
                </div>
            )}
            <CarList />
            <Carousel />
            <div style={{ padding: "12px 20px 12px 20px" }}>
                <ExitAnimation />
            </div>
            {/*<Auction />*/}
            {/*<ModelList />*/}
            {/*<ChatBotWithAI />*/}
            {/*<Example />*/}
            {/*<Foos2 />*/}
            <Card />
        </div >
    )
}

export default App