import React, {useState} from 'react'
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import LogoImage from '../utils/Images/Logo.png';
import { MenuRounded } from '@mui/icons-material';
import { Avatar } from '@mui/material';

const Nav = styled.div`
background: ${({theme}) => theme.bgLight};
height: 100px;
display: flex; 
align-items: center; 
font-size: 1rem; 
position: sticky;
top: 0;
z-index:10;
color:white;
border-bottom: 1px solid black;
box-shadow: 4px 4px 8px rgba(0, 0, 0, 1);
`;
const NavContainer = styled.div`
width: 100%; 
max-width: 1400px;
height: 100%;
display: flex; 
gap:14px; 
padding: 0px 24px; 
font-size: 1 rem; 
justify-content: space-between;`;

const NavLogo = styled(Link)`
width: 100%;
display: flex; 
align-items: center; 
gap: 16px;
padding: 0px 6px; 
font-weight: 600; 
font-size: 18px; 
text-decoration: none;
color: grey;
&:hover{color: white}`;

const Logo = styled.img`
  height: 100px;
`;

const Mobileicon = styled.div`
color: ${({theme}) => theme.primary}; 
display: none;
@media(max-width: 786px){
  display: flex; 
  align-items: center;};
`;

const NavItems = styled.ul`
display: flex;
width: 100%;
align-items: center; 
justify-content:center;
gap: 32px; 
padding: 0 6px; 
list-style: none;
@media(max-width: 786px)
{display:none;}`;


const Navlink = styled(NavLink)`
display: flex;
align-items: center;
color: grey;
font-weight: 500;
cursor: pointer;
transition: all 1s slide-in;
text-decoration: none;
&:hover {
color: white;
}
&:active{
color: ${({theme}) => "white"};
border-bottom: 2px solid white;}
`;

const UserContainer = styled.div`
display: flex; 
width: 100%; 
white-space: nowrap;
align-items: center;
justify-content: flex-end;
gap: 16px; 
color: grey; 
padding: 0 15px; 
`;

const TextButton = styled.div``;

const MobileMenu = styled.ul`
display: flex; 
flex-direction: column; 
align-items: start; 
padding: 0 6px; 
gap: 16px;
list-style:none;
width: 90%;
padding: 12px 40px 24px 40px;
background: ${({theme}) => theme.bgLight};
position: absolute;
top: 80px; 
right: 0px;
transition: all 0.5s ease-in-out;
transform: ${props => (props.$isOpen ? "translateY(0)" : "translateY(-100%)")};
border-radius: 0 0 20px 20px;
opacity: ${props => (props.$isOpen ?"100%" : "1%")};
z-index: ${props => (props.$isOpen ? "10000" : "-100")};
`;


const Navbar = () => {


  const [isOpen, setisOpen] = useState(false);
  return (
    <Nav>
      <NavContainer>
        <Mobileicon  onClick={() => {setisOpen(!isOpen);}}>  
          <MenuRounded sx={{color: 'white'}}></MenuRounded>
        </Mobileicon>
        <NavLogo to="/">
          <Logo src = {LogoImage}/>
            Bird Fitness
        </NavLogo>

        <MobileMenu $isOpen = {isOpen}>
          <Navlink to = "/">Home</Navlink>
          <Navlink to = "/">Workouts</Navlink>
          <Navlink to = "/">Tutorials</Navlink>
          <Navlink to = "/">Blog</Navlink>
          <Navlink to = "/">Contact</Navlink>
        </MobileMenu>

        <NavItems>
          <Navlink to = "/">Home</Navlink>
          <Navlink to = "/">Workouts</Navlink>
          <Navlink to = "/">Tutorials</Navlink>
          <Navlink to = "/">Blog</Navlink>
          <Navlink to = "/">Contact</Navlink>
        </NavItems>

        <UserContainer>
          <Avatar/>
          <TextButton>Log Out</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  )
}

export default Navbar