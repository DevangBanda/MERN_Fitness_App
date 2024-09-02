import React, {useState} from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

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
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => { 
          alert("signedin");
          dispatch(loginSuccess(res.data));
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };

  return (
    <Container>
        <div>
            <TextPrimary>Welcome to the Bird Fitness</TextPrimary>
            <TextSecondary>Please Login with your details</TextSecondary>
        </div>

        <TextInput 
          label="Email Address" 
          placeholder={"Enter your email address"} 
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
          />
        
        <div>
            <TextInput label="Password" placeholder={"Enter your password"}  password
            value={password}
            handelChange={(e) => setPassword(e.target.value)}></TextInput>
            <ForgotButton style={{textAlign: 'right'}}>Forgot Password</ForgotButton>
        </div>
        
        <Button text="Sign In"  onClick={handelSignIn}
          ></Button>
    </Container>
  )
}

export default SignIn