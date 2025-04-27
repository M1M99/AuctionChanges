import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const CarouselForDetails = () => (
    //<Carousel autoplay>
    //    <div>
    //        <h3 style={contentStyle}>1</h3>
    //    </div>
    //    <div>
    //        <h3 style={contentStyle}>2</h3>
    //    </div>
    //    <div>
    //        <h3 style={contentStyle}>3</h3>
    //    </div>
    //    <div>
    //        <h3 style={contentStyle}>4</h3>
    //    </div>
    //</Carousel>

    <Carousel autoPlay autoplaySpeed={1500} effect="scroolx"
        /*speed={800}*/
        autoplay
        dots={true}
        arrows={true}>
        <div>
            <h3 style={contentStyle}>1</h3>
        </div>
        <div>
            <h3 style={contentStyle}>2</h3>
        </div>
        <div>
            <h3 style={contentStyle}>3</h3>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
        </div>
    </Carousel>
);
export default CarouselForDetails;