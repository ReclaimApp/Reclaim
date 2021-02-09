import React from 'react';
import { Button, Container, Jumbotron, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import StyleSheet from './onboarding.module.css';
// import categoryScroll from '../../media/category-scroll.mp4';

const StyledFbButton = Styled.button`
  width: 25%;
  margin: 3% auto;
  padding: 1%;
  font-size: 1.3rem;
  background: royalBlue;
  color: #fff;
  border: 1px solid oldlace;
  border-radius: 6px;
`;

const StyledButton = Styled.button`
  width: 25%;
  margin: 3% auto;
  padding: 1%;
  font-size: 1.3rem;
  background-color: #4b3f72;
  color: #fff;
  border: 1px solid oldlace;
  border-radius: 6px;
`;

const Landing = () => {
  return (
    <div className={StyleSheet.landing}>
      <Jumbotron fluid>
        <Container>
          <h1 className={StyleSheet.header}>SelfExplore</h1>
          <p className={StyleSheet.headerText}>
            SelfExplore is a tool that helps you collect, store, and explore all
            of your social media data
          </p>
        </Container>
      </Jumbotron>
      <Button as={StyledFbButton}>Log into Facebook</Button>
      <Container>
        <Row className={StyleSheet.row}>
          <Button as={StyledButton}>Explore Facebook</Button>
          <Button as={StyledButton}>Explore Twitter</Button>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
