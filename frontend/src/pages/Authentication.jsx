import React,{useState} from 'react'
import styled from 'styled-components';
import LogoImage from '../utils/Images/Logo.png';
import AuthImage from '../utils/Images/AuthImg.png';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Container = styled.div`
flex: 1; 
height: 100vh;
width: 100%; 
display: flex; 
background: ${({theme}) => theme.bg};
@media(max-width: 700px)
{flex-direction :column;} `; 

const Left = styled.div`
flex: 1;
@media(max-width: 700px)
{flex-direction :column;
display: none;};
position: relative;

`; 

const Right = styled.div`
flex: 1; 
display: flex;
flex-direction: column; 
padding: 40px;
position: relative;
@media(max-width: 700px)
{flex-direction :column;}
align-items: center;
justify-content: center;
`; 

const Logo = styled.img`
// Import from Utils
position: absolute;
width: 200px; 
top: 10px; 
left: 20px;
z-index: 10;

`;

const Image = styled.img`
position: relative;
width: 100%; 
height: 100%;
z-index: 9;
Object-fit: cover`;

const Text = styled.div`
font-size:18px; 
text-align: center; 
color: ${({theme}) => theme.text_secondary};
margin-top: 16px;
@media(max-width: 400px)
{font-size: 14px;}
`;

const TextButton = styled.span`
color: ${({theme}) => theme.primary};
cursor: pointer;
font-weight: bold;`;

const Authentication = () => {

    const [login, setLogin]= useState(false);


  return (
    <Container>
        <Left>
            <Logo src={LogoImage}/>
            <Image src={AuthImage}/>
        </Left>
        <Right> 
            {!login? 
                <>
                    <SignIn/>
                    <Text>Don't have an account?{' '}
                        <TextButton onClick={() => {setLogin(true);}}>Sign Up</TextButton>
                    </Text>
                </> : 

                <> 
                    <SignUp/>
                    <Text>Already have an account?{' '}
                        <TextButton onClick={() => {setLogin(false);}}>Sign In</TextButton>
                    </Text>
                </>
            }
        </Right> 
    </Container>
  )
}

export default Authentication