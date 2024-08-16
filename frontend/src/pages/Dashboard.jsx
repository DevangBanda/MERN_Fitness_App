import React from 'react'
import styled from "styled-components";
import {counts} from '../utils/data';
import Tile from '../components/Cards/Tile';

const Container = styled.div`
display: flex; 
height: 100%;
width: 100%;
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
flex-wrap: wrap;
justify-content: space-evenly;
gap: 30px;
padding: 0 20px;
@media(max-width: 786px){gap:10px;}`
;

const Dashboard = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
          <FlexWrap>
              {counts.map((item)=>{
                  {console.log(item)}
                  return <Tile key={item} item={item}/>
              })}
         </FlexWrap>
      </Wrapper>
    </Container>
  )
}

export default Dashboard