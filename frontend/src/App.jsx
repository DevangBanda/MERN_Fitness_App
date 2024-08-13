import button from "./components/Button";
import TextInput from "./components/TextInput";
import './index.css';
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme } from "./utils/Themes";
import {BrowserRouter} from 'react-router-dom';
import Authentication from "./pages/Authentication";
import React,{useState} from "react";
import Navbar from "./components/Navbar";

const Container = styled.div`
height: 100vh; 
width: 100%; 
display:flex;
flex-direction: column; 
backgroumd:${({theme}) => theme.bg}; 
color: ${({theme}) => theme.text_primary};
overflow-x: hidden;
overflow-y: hidden; 
transition: all 0.2s ease`;

function App() {

  const [user, setUser] = useState(true);

    return (
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          {user ? 
          <Container>
            <Navbar/>
          </Container>  :
          
          <Container> 
            <Authentication/>
          </Container>}
          
        </BrowserRouter>
      </ThemeProvider>
    )
}

export default App
