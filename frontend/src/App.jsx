import button from "./components/Button";
import TextInput from "./components/TextInput";
import './index.css';
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme } from "./utils/Themes";
import {BrowserRouter} from 'react-router-dom';
import Authentication from "./pages/Authentication";
import React,{useState} from "react";
import Navbar from "./components/Navbar";
import {Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import Tutorials from "./pages/Tutorials";
import Blog from './pages/Blog'
import { useSelector } from "react-redux";

const Container = styled.div`
height: 100vh; 
width: 100%; 
display:flex;
flex: 1;
flex-direction: column; 
background:${({theme}) => theme.bg}; 
color: ${({theme}) => theme.text_primary};
overflow-x: scroll;
overflow-y: hidden; 
transition: all 0.2s ease
  /* Media query for screens smaller than 470px */
  @media (max-width: 470px) {
    width: 100%;
    /* Adjust additional styles for smaller screens here */
  }
}`;

function App() {

  //const [user, setUser] = useState(true);
    const { currentUser } = useSelector((state) => state.user);
    currentUser ? console.log("true") : console.log("false");

    return (
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          {currentUser ? 
          (  
          <Container>
            <Navbar/>
            <Routes>
              <Route path = "/" exact element = {<Dashboard/>}/>
              <Route path = "/workout" exact element = {<Workout/>}/>
              <Route path = "/tutorials" exact element = {<Tutorials/>}/>
              <Route path = "/blog" exact element = {<Blog/>}/>
            </Routes>
          </Container>  ):
         
          (
    
          <Container> 
            <Authentication/>
          </Container>)
          }
          
        </BrowserRouter>
      </ThemeProvider>
    )
}

export default App
