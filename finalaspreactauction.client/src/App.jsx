import CarList from "./Components/Fetch/CarList"
import Header from "./Components/Page/Header"
import Footer1 from "./Components/Example/Example11"
import ModelList from "./Components/Fetch/ModelList"
import CarouselForDetails from "./Components/Example/carousel"
import Auction from "./Components/Auction/AuctionHandle"
import ExitAnimation from "./Components/Example/Animation"
import Carousel from "./Components/Example/CarouselUI"
import ForAdmin from "./Components/Example/ForAdmin"
import Card from "./Components/Example/Card"

function App() {
    return (
        <div className="totalContainer">
            <Header />
            <CarList />
            <Carousel />
            {/*<CarouselForDetails />*/}
            <ExitAnimation />
            <Auction />
            {/*<ModelList />*/}
            {/*<ChatBotWithAI />*/}
            {/*<Example />*/}
            {/*<CarList22 />*/}
            {/*<Foos2 />*/}
            <Card></Card>
        </div>
    )
}

export default App