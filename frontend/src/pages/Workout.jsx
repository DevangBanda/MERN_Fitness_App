import React from 'react'
import styled, { ThemeProvider } from 'styled-components';
import WorkoutCard from '../components/Cards/WorkoutCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from "@mui/x-date-pickers"; 


const Container = styled.div`
display: flex; 
flex:1;
height: 100%;
overflow-y: scroll;
padding: 22px 0; 
justify-content: center;`;

const Wrapper = styled.div`
flex: 1; 
max-width: 1600px;
display: flex; 
gap: 22px;
padding: 0 16px;
@media(max-width: 700px){gap: 14px; flex-direction: column;}`;

const Left = styled.div`
flex: 0.4;
height: fit-content; 
background: ${({theme}) => theme.bgLight};
border: 1px solid black;
box-shadow: 4px 4px 8px rgba(0, 0, 0, 1);
border-radius: 12px;
padding: 10px 0 0 25px;
margin: 20px 20px 0 0 ;`; 

const Title = styled.div`
font-weight: 500; 
font-size: 20px; 
color: white; 
@media(max-width: 600px){font-size: 14px;}
`;

const Right = styled.div`
flex: 1; 
`;

const Section = styled.div`
display: flex; 
align-items: center; 
justify-content: center;
flex: 1;
padding: 10px 0px;
`;

const SecTitle = styled.div`
font-size: 2rem;
color: mainPrimary;
text-align: center;
color: white;
`;

const CardWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 20px;
margin-bottom: 100px;
@media(max-width: 786px){gap:10px;} 
`;

const Workout = () => {
  return (
    <Container>
      <Wrapper> 
        <Left> 
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar 
            sx={{
              color: 'white', // Uses theme color
            
            }}/>
          </LocalizationProvider>
        </Left>
        <Right> 
          <Section>
            <SecTitle>Today's Workout</SecTitle>
          </Section>
          <CardWrapper>
            <WorkoutCard />
            <WorkoutCard/>
            <WorkoutCard/>
            <WorkoutCard/>
            <WorkoutCard/>
            <WorkoutCard/>
          </CardWrapper>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Workout