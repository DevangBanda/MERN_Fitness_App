
import React from 'react'
import styled from 'styled-components';
import { FitnessCenterRounded, TimelapseRounded } from '@mui/icons-material';


const Card = styled.div`
display: flex; 
flex: 1; 
color: white;
flex-direction: column;
width: fit-content;
align-items: start;
background: ${({theme}) => theme.bgLight};
border: 1px solid black;
box-shadow: 4px 4px 8px rgba(0, 0, 0, 1);
border-radius: 12px;
padding: 10px 0 0 25px;`; 


const Category = styled.div`
font-size: 24px; 
font-weight: 400;
width: fit-content;
background: yellow;
color: black;
border-radius: 10px;
padding: 0 5px;
@media(max-width){font-size: 20px};
`;

const Name = styled.div`
font-size: 30px; 
font-weight: 500;
width: fit-content;
@media(max-width){font-size: 20px};`; 

const Amount = styled.div``;

const Flex = styled.div`
display: flex;
padding: 0 20px;
gap: 20px;`; 

const Details = styled.div`
display: flex; 
font-size: 15px;
align-items: center;
justify-content: center;
gap: 4px; 
flex-wrap: nowrap;`; 


const WorkoutCard = () => {
  return (
    <Card>
        <Category>Back</Category>
        <Name>Lat Pull Down</Name>
        <Amount>3 Sets | 12 Reps each</Amount>
        <Flex>
            <Details>
                <FitnessCenterRounded sx={{fontSize: "20px"}} />
                30Kgs
            </Details>
            <Details>
                <TimelapseRounded sx={{fontSize: "20px"}} />
                15 Minutes
            </Details>
        </Flex>
        
    </Card>
  )
}

export default WorkoutCard