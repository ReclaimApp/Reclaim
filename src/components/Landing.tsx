import React from 'react';
import { Button, Container, Jumbotron, Row, Col } from 'react-bootstrap';
import Styled from 'styled-components';
import { useSelector } from 'react-redux';
import StyleSheet from './onboarding.module.css';

const StyledFbButton = Styled.button`
  width: 75%;
  margin: 3% auto;
  padding: 3%;
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
  padding: 3%;
  font-size: 1.3rem;
  font-weight: 600;
  width: 75%;
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
  width: 75%;
  margin: 3% auto;
  padding: 3%;
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
  width: 75%;
  margin: 3% auto;
  padding: 3%;
  font-size: 1.3rem;
  background-color: #4b3f72;
  color: #fff;
  border: 1px solid oldlace;
  border-radius: 6px;
  opacity: 0.6;
`;

const Landing = (props) => {
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  const userTwtrData = useSelector(
    (state) => state.TwitterReducer.userTwtrData
  );

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

      <Container className={StyleSheet.parentContainer}>
        <Col className={StyleSheet.column}>
          <Button as={StyledFbButton}>Login to Facebook</Button>
          <Button as={StyledButton}>Download Facebook data</Button>
          {userFbData ? (
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
        </Col>
        <Col className={StyleSheet.column}>
          <Button as={StyledTwitterButton}>Login to Twitter</Button>
          <Button as={StyledButton}>Download Twitter data</Button>
          {userTwtrData ? (
            <Button
              as={StyledButton}
              onClick={() => props.history.push('/twitter')}
            >
              Explore Twitter
            </Button>
          ) : (
            <Button disabled as={StyledButtonDisabled}>
              Explore Twitter
            </Button>
          )}
        </Col>
      </Container>
    </div>
  );
};

export default Landing;
