import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarList from './Fetch/CarList';

function Emp() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Carousel interval={700} className="m-2">
            <Carousel.Item >
                <a href="/#">
                    <img  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                        src="https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMHIspMBvMZq6G5OtgSv31nBJaA4qh4NSEGewirQ91wRmWBi2Ow7gVdc0BtUlhDfzEPspAnPdjEiZJyNydlctBvoZ9nf8dXFWr6a%25JsewTRmWBi1%25k7gVdcF5XUlhDfu7dspAnPeAEiZkm69PTvmCT8ZVHE5AKfyUxtMlJ49pNmH" text="First slide" />
                </a>
                <Carousel.Caption>
                    <h3>Auction Bit Now</h3>
                    <p>Luxury cars. Fair bids. Delivered to your door.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} src="https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1080x624/dam/pnr/2024/Products/992-II/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg/jcr:content/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg" text="First slide" />
                <Carousel.Caption>
                    <h3>Your Next Car is Just One Bid Away</h3>
                    <p>Auction your way to a better deal. Fast, and 100% online car bidding.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} src="https://media.ed.edmunds-media.com/audi/rs-6/2025/oem/2025_audi_rs-6_wagon_performance_fq_oem_1_1600.jpg" text="First slide" />
                <Carousel.Caption>
                    <h3>Bid. Win. Drive.</h3>
                    <p>Place your bid, win the car, and hit the road.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Emp;
