import { LineAxisOutlined } from '@mui/icons-material';
import { axisClasses, BarChart, barElementClasses, BarLabel, legendClasses} from '@mui/x-charts';
import React from 'react'
import styled from "styled-components"; 
import {Bar} from "react-chartjs-2";


const Card = styled.div`
flex: 1; 
min-width:300px; 
display: flex;
flex-direction:column; 
padding: 24px; 
background: ${({theme}) => theme.bgLight};
border: 1px solid black;
box-shadow: 4px 4px 8px rgba(0, 0, 0, 1);
border-radius: 12px;
align-items: center;
gap: 24px; 
@media(max-width: 600px){gap: 16px;}`; 

const Title = styled.div`
font-weight: 600; 
font-size: 32px;
@media(max-width: 600px){font-size: 20px;}`;


const GraphicTile = ({data}) => {
  return (
    <Card>
    {console.log("GraphicTile")}
        <Title>Weekly Calories burnt</Title>
        {data?.weekCalories &&
        (<BarChart
            xAxis={[{scaleType: "band", data: data?.weekCalories?.weeks, stroke:"#FF0000",
              colorMap: {
                type: 'ordinal',
                colors: ['#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e']
              }, label:"Day of month", 
              tickLabelStyle: {stroke: "#FFFFFF", 
                fontSize: 15,}, 
              
            }]}
            series={[{scaleType:"band", data: data?.weekCalories?.caloriesBurnt, label:"Calories Burnt Per Day",
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: {height: 30,color: 'black', opacity: 0.3 },
              highlighted: {
                color: 'red', // Color for highlighted items
                height: 350 // Optional: adjust height for highlighted items if needed
              }
            }]}
            height={300}
            borderRadius={10}
            slotProps={{legend: {labelStyle: {fill:'white'}}}}
            
      
            sx={{
              [`& .${axisClasses.root} .${axisClasses.line}`]: {stroke: 'white'},
              [`& .${axisClasses.root} .${axisClasses.tickLabel}`]: {stroke: 'white'},
              [`& .${axisClasses.root} .${axisClasses.label}`]: {stroke: 'white'},
            }}
        />
        )}
    </Card>
  )
}

export default GraphicTile