import React from 'react';
import { Button, Container, Jumbotron, Row } from 'react-bootstrap';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import StyleSheet from './onboarding.module.css';
// import categoryScroll from '../../media/category-scroll.mp4';

const StyledFbButton = Styled.button`
  width: 25%;
  margin: 3% auto;
  padding: 1%;
  font-size: 1.3rem;
  font-weight: 600;
  background: royalBlue;
  color: #fff;
  border: 1px solid oldlace;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledTwitterButton = Styled.button`
  margin: 3% auto;
  padding: 1%;
  font-size: 1.3rem;
  font-weight: 600;
  width: 25%;
  background-color: rgb(29, 161, 242);
  border: 1px solid rgb(29, 161, 242);
  border-radius: 25px;
  color: #fff;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
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
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledButtonDisabled = Styled.button`
  width: 25%;
  margin: 3% auto;
  padding: 1%;
  font-size: 1.3rem;
  background-color: #4b3f72;
  color: #fff;
  border: 1px solid oldlace;
  border-radius: 6px;
  opacity: 0.6;
`;

const Landing = (props, { userFbData }) => {
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
      <Container>
        <Row className={StyleSheet.row}>
          <Button as={StyledFbButton}>Login to Facebook</Button>
          <Button as={StyledTwitterButton}>Login to Twitter</Button>
        </Row>
      </Container>
      <Container>
        <Row className={StyleSheet.row}>
          <Button as={StyledButton}>Download Facebook data</Button>
          <Button as={StyledButton}>Download Twitter data</Button>
        </Row>
      </Container>
      <Container>
        <Row className={StyleSheet.row}>
          {userFbData === true ? (
            <Button
              as={StyledButton}
              onClick={() => props.history.push('/categories')}
            >
              Explore Facebook
            </Button>
          ) : (
            <Button disabled as={StyledButtonDisabled}>
              Explore Facebook
            </Button>
          )}
          <Button as={StyledButton}>Explore Twitter</Button>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
