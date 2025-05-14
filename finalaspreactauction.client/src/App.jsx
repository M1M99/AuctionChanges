import CarList from "./Components/Fetch/CarList"
import ModelList from "./Components/Fetch/ModelList"
import Auction from "./Components/Auction/AuctionHandle"
import ExitAnimation from "./Components/Example/Animation"
import Carousel from "./Components/Example/CarouselUI"
import ForAdmin from "./Components/Example/ForAdmin"
import Card from "./Components/Example/Card"

function App() {
    return (
        <div className="totalContainer" style={{ marginTop: "-25px" }}>
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