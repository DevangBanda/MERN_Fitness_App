import { Description } from '@mui/icons-material';
import React from 'react'
import styled from "styled-components"


const Container = styled.div`
flex: 1;
display: flex; 
width: fit-content;
align-items: center;
background: ${({theme}) => theme.bgLight};
border: 1px solid black;
box-shadow: 4px 4px 8px rgba(0, 0, 0, 1);
border-radius: 12px;
padding: 10px 0 0 25px;

`;

const Left = styled.div`
display: flex; 
width: 100%; 
flex-direction: column;
`;

const Icon = styled.div`
display: flex; 
height: fit-content;
padding: 20px;
display: flex; 
justify-content: center; `;

const LeftContainer = styled.div``;

const Title = styled.div`
font-size: 1.5rem; 
font-weight: 600;
color: orange;
`;

const Value = styled.div`
display: flex;
align-items: center;
gap: 20px;
font-size: 28px;
font-weight: 600;
@media(max-width: 600px){gap: 12px;}
`;

const Units = styled.div`
font-size: 20px;
font-weight: 400;
@media(max-width: 600px){font-size: 16px;}`;


const Change = styled.div`
font-size: 20px;
font-weight: 500;
${({positive, theme})=> positive? 
`color: green`:`color: red`};
@media(max-width: 600px){font-size: 16px;}`;

const Desc = styled.div`
font-size: 16px;
@media(max-width: 600px){font-size: 12px;}`;



const Tile = ({item}) => {
  return (
    <Container>
        <Left>
          <LeftContainer>
            <Title>{item.name}</Title>
            <Value>Value
              <Units>{item.unit}</Units>
              <Change positive>(10%)</Change>
            </Value>
            <Desc>{item.desc}</Desc>
          </LeftContainer>
        </Left>
        <Icon>
          {item.icon}
        </Icon>
    </Container>
  )
}

export default Tile