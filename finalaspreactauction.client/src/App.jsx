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
import AdminProfile from "./Components/Admin/AdminProfile"
import BiddingInterface from "./Components/Auction/BidPage"

function App() {
    return (
        <div className="totalContainer" style={{ marginTop: "-25px" }}>
            {/*<Header />*/}
            <CarList />
            <Carousel />
            <div style={{ padding: "12px 20px 12px 20px" }}>
                <ExitAnimation />
            </div>
            {/*<Auction />*/}
            {/*<CarouselForDetails />*/}
            {/*<ModelList />*/}
            {/*<ChatBotWithAI />*/}
            {/*<Example />*/}
            {/*<CarList22 />*/}
            {/*<Foos2 />*/}
            {/*<AuctionProvider>*/}
            {/*    <BiddingInterface />*/}
            {/*</AuctionProvider>*/}
            <Card />
        </div >
    )
}

export default App