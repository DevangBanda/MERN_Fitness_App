import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import {counts} from '../utils/data';
import Tile from '../components/Cards/Tile';
import GraphicTile from '../components/Cards/GraphicTile';
import StatsChart from '../components/Cards/StatsChart';
import WorkoutCard from '../components/Cards/WorkoutCard';
import AddWorkout from '../components/AddWorkout';
import { getDashboardDetails, getWorkouts, addWorkout } from '../api';

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

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs
-Back Squat
-5 setsX15 reps
-30 kg
-10 min`);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };
  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
      setLoading(false);
    });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await addWorkout(token, { workoutString: workout })
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);


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
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
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