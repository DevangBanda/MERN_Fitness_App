import { LineAxisOutlined } from '@mui/icons-material';
import { BarChart } from '@mui/x-charts';
import React from 'react'
import styled from "styled-components"; 
import {Bar} from "react-chartjs-2";
import {Chart as ChartJs} from 'chart.js';

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
        // (<BarChart
        //     xAxis={[{scaleType: "band", data: data?.weekCalories?.weeks,},
        //         {colorMap:{colors: ["White", "Red", "Pink"], type:'ordinal'}}
        //      ]}
        //     series={[{scaleType:"band", data: data?.weekCalories?.caloriesBurnt},]}
        //     height={300}
        // />
        // )}
        (
          <Bar>

          </Bar>
        )}
    </Card>
  )
}

export default GraphicTile