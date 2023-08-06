import React from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
    height: 200px;
    display: flex;
    background-color: #FFF389;
    justify-content: center;
`

function Footer() {
    return(
        <Wrapper>
            <span>나랑노랑</span>
            <span>나랑노랑 © 2023. All rights reserved by C208</span>
        </Wrapper>
    )
}

export default Footer;