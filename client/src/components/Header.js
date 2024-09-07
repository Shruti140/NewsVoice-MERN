import styled from 'styled-components';

const NavBar= styled.div`
    background-color:  rgb(42, 42, 48);
    padding: 10px 0px;
    color: white;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 50;
`

const Text = styled.div`
    font-size: 30px;    
    margin-top: 6px;
    display: flex;
    justify-content: space-around;
    margin-right: 46px;
`

const Header = () => {
    return(
        <NavBar>
            <Text>NewsVoice</Text>
            <div className="space-around">~ News At Your Command ~</div>
        </NavBar>
    );
}

export default Header;