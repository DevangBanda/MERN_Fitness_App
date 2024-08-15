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
            <Routes>
              <Route path = "/" element = {<Dashboard/>}/>
              <Route path = "/workout" element = {<Workout/>}/>
              <Route path = "/tutorials" element = {<Tutorials/>}/>
              <Route path = "/blog" element = {<Blog/>}/>
            </Routes>
          </Container>  :
          
          <Container> 
            <Authentication/>
          </Container>}
          
        </BrowserRouter>
      </ThemeProvider>
    )
}

export default App
