import React from 'react'
import styled from "styled-components";
import {counts} from '../utils/data';
import Tile from '../components/Cards/Tile';
import GraphicTile from '../components/Cards/GraphicTile';
import StatsChart from '../components/Cards/StatsChart';
import WorkoutCard from '../components/Cards/WorkoutCard';

const Container = styled.div`
display: flex; 
height: 100%;
max-width: 100%;
flex: 1;
justify-content: center;
overflow-y: scroll;
color: ${({theme}) => theme.mainPrimary};
`;


const Title = styled.div`
font-size: 2rem;
color: mainPrimary;
text-align: center;
`;

const Wrapper = styled.div`
flex: 1; 
display: flex; 
flex-direction: column;
gap: 30px;
@media(max-width: 700px){gap: 18px;}
`;

const FlexWrap = styled.div`
display: flex;
flex: 1;
flex-wrap: wrap;
justify-content: space-evenly;
gap: 30px;
padding: 0 20px;
@media(max-width: 786px){gap:10px;}`
;

const Section = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-bottom: 50px;
padding: 0 20px;
@media(max-width: 786px){gap:10px;}`;

const CardWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
gap: 30px;
padding: 0 20px;
@media(max-width: 786px){gap:10px;}`;

const Dashboard = () => {

  const data = {
    totalCaloriesBurnt: 1350, 
    totalWorkouts: 6, 
    avgCaloriesBurntPerWorkout: 225, 
    weekCalories:{
      weeks:["17th", "18th","19th","20th","21st","22nd"],
      caloriesBurnt:[10500, 10500,10500,10500,10500,0]
    }, 
    pieChartData: [
      {
        id: 0, 
        value: 2500, 
        label: "arms"
      },
      {
        id: 1, 
        value: 1500, 
        label: "chest"
      },
      {
        id: 2, 
        value: 3750, 
        label: "back"
      }, 
      {
        id: 3, 
        value: 5000, 
        label: "legs"
      },
    ],
  };


  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
          <FlexWrap>
              {counts.map((item)=>{
                  return <Tile key={item.key} item={item} data={data}/>
              })}
          </FlexWrap>

         <FlexWrap>
          <GraphicTile data = {data}></GraphicTile>
          <StatsChart data = {data}></StatsChart>
         </FlexWrap>

         <Section>
          <Title>Today's Workouts</Title>
          <CardWrapper>
            <WorkoutCard></WorkoutCard>
            <WorkoutCard></WorkoutCard>
            <WorkoutCard></WorkoutCard>
          </CardWrapper>
         </Section>
      </Wrapper>
    </Container>
  )
}

export default Dashboard