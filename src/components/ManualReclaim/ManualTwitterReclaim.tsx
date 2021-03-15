import React from 'react'
import { Button, Col, ListGroup } from 'react-bootstrap';
import Styled from 'styled-components';
import StyleSheet from './manualReclaim.module.css';

const StyledButton = Styled.button`
  width: 40%;
  margin: 2% auto;
  padding: 2%;
  font-size: 1.3rem;
  background-color: #4b3f72;
  color: #fff;
  border: 1px solid oldlace;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const HomeButton = Styled.button`
  width: 10%;
  margin: 0% auto;
  padding: 0.5%;
  background: royalBlue;
  color: #fff;
  border: 1px solid oldlace;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;


const ManualTwitterReclaim = (props) => {
  return (
    <div className={StyleSheet.landing}>
      <h2 className={StyleSheet.header}>
          Manually reclaim Twitter data
      </h2>
      <Button as={HomeButton} onClick={() => props.history.push('/')}>Home</Button>
      <Col className={StyleSheet.twitterColumn}>
        <p className={StyleSheet.step}>Step 1: Login to Twitter</p>
        <Button onClick={() => window.open('http://twitter.com/login')} as={StyledButton}>Login</Button>
        <p className={StyleSheet.step}>Step 2: request a copy</p>
        <Button onClick={() => window.open('https://twitter.com/settings/download_your_data')} as={StyledButton}>Download Your Information</Button>
        <ListGroup className={StyleSheet.listGroup}>
          <ListGroup.Item className={StyleSheet.subtext}> - Twitter will need to create your archive before you can download it</ListGroup.Item>
          <ListGroup.Item className={StyleSheet.subtext}> - Click the 'Download Archive' button</ListGroup.Item>
          <ListGroup.Item className={StyleSheet.subtext}> - Finally unzip your data folder and place it in a folder called 'your_data' in your Documents folder</ListGroup.Item>
          <ListGroup.Item className={StyleSheet.subtext}> - Urgent: If there is no folder called 'your_data' in your Documents you must create that folder and place your data inside of it for the app to function</ListGroup.Item>
        </ListGroup>
          <ListGroup.Item className={StyleSheet.subtext}>
            If you have further issues please reach out to austin@reclaim.social
          </ListGroup.Item>
      </Col>
    </div>
  )
}

export default ManualTwitterReclaim;
