import { LineAxisOutlined } from '@mui/icons-material';
import { PieChart} from '@mui/x-charts';
import React from 'react'
import styled from "styled-components"; 
import {Bar} from "react-chartjs-2";
import { Legend } from 'chart.js';


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


const StatsChart = ({data}) => {
  return (
    <Card>
    {console.log("GraphicTile")}
        <Title>Weekly Calories burnt</Title>
        {data?.pieChartData &&
        (<PieChart
            series={[
                {
                    data:data.pieChartData,
                    innerRadius: 8,
                    cornerRadius: 5,
                    paddingAngle: 5,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -20, color: 'white' },
                }
            ]}
            width={400}
            height={300}
        />
        
        )} 
    </Card>
  )
}

export default StatsChart