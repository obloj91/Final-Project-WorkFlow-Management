import React from "react";
import styled from "styled-components";
import logo from "../assets/logo1.jpg";
const Header = () =>{


    return (
        <>
        <Wrapper>
            <img src={logo} alt="Logo"/>
            <h2>WorkFlow Management</h2>
        </Wrapper>
        
        </>
    )

}

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
background: rgba(221, 237, 236, 1);
color: rgb(40,176,255);

img{
    width: 100px;
}
`
export default Header;