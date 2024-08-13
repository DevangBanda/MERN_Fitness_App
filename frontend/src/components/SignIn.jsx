import React from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';


const Container = styled.div`
display: flex; 
flex-direction: column;
gap:20px;
width: 80%;
@media(max-width: 800px)
{gap:8px;}`; 

const TextPrimary = styled.div`
font-size: 30px; 
font-weight: bold;
color:${({theme}) => theme.TextSecondary}`; 

const TextSecondary = styled.div`
color:${({theme}) => theme.menu_secondary_text}`; 
; 

const ForgotButton = styled.div`
color:${({theme}) => theme.TextSecondary}; 
cursor:pointer
`;


const SignIn = () => {
  return (
    <Container>
        <div>
            <TextPrimary>Welcome to the Bird Fitness</TextPrimary>
            <TextSecondary>Please Login with your details</TextSecondary>
        </div>

        <TextInput label="Email Address" placeholder={"Enter your email address"}></TextInput>
        
        <div>
            <TextInput label="Password" placeholder={"Enter your password"}></TextInput>
            <ForgotButton style={{textAlign: 'right'}}>Forgot Password</ForgotButton>
        </div>
        
        <Button text="Sign In"></Button>
    </Container>
  )
}

export default SignIn