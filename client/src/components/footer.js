import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

const Container=styled.div`
    background-color: #000;
    padding: 10px 50px;
    color: grey;
    border-top: 2px solid rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: space-between;
    font-size: 14px;
`

const Footer=()=>{
    return(
        <Container >
            <p>© all rights reserved</p>
            <p>Made with < FaHeart /> by Shruti</p>
        </Container>
    );
}

export default Footer;