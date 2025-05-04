import React from 'react';
import styled from 'styled-components';

function Features() {
    const List = styled.li`
    font-weight:600;
    padding-bottom:7px;
    font-size:20px;
    font-family: 'Cascadia Code'; 

    &:hover{
        color:red
    }
    `
    return (
        <section style={{ padding: '40px', background: '#ddd' }}>
            <h2 style={{textAlign:"center",fontFamily:"Roboto"}}>Features</h2>
            <ul>
                <List>Live Car Auctions</List>
                <List>Bid Tracking</List>
                <List>Vehicle History Reports</List>
                <List>User Ratings and Reviews</List>
                <List>Secure Payment Processing</List>
            </ul>
        </section>
    );
}

export default Features;
