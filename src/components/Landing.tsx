import React, { useState } from 'react';
import {
  Button,
  Container,
  Jumbotron,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import Styled from 'styled-components';
import { useSelector } from 'react-redux';
import facebookScriptIndex from '../automation/facebook/index';
import twitterScriptIndex from '../automation/twitter/index';
import StyleSheet from './onboarding.module.css';

const StyledFbButton = Styled.button`
  width: 70%;
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
  width: 70%;
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
  width: 70%;
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
  width: 70%;
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
  const [scriptRunning, setScriptRunning] = useState(false);
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  const userTwtrData = useSelector(
    (state) => state.TwitterReducer.userTwtrData
  );

  const startScript = () => {
    // setScriptRunning(true);
    facebookScriptIndex();
    // setScriptRunning(false);
  };
  const startTwitterScript = () => {
    // setScriptRunning(true);
    twitterScriptIndex();
    // setScriptRunning(false);
  };

  return (
    <div className={StyleSheet.landing}>
      <Jumbotron fluid>
        <Container>
          <h1 className={StyleSheet.header}>Reclaim</h1>
          <p className={StyleSheet.headerText}>
            Reclaim is a tool that helps you collect, store, and explore all of
            your social media data
          </p>
        </Container>
      </Jumbotron>
      <Button
        className={
          scriptRunning ? StyleSheet.autoButtonDisabled : StyleSheet.autoButton
        }
        disabled={scriptRunning}
        onClick={startScript}
      >
        Automatically reclaim Facebook data
      </Button>
      <Button
        className={
          scriptRunning ? StyleSheet.autoButtonDisabled : StyleSheet.autoButton
        }
        disabled={scriptRunning}
        onClick={startTwitterScript}
      >
        Automatically reclaim Twitter data
      </Button>
      <Container className={StyleSheet.parentContainer}>
        <Col className={StyleSheet.column}>
          <h2 className={StyleSheet.columnHeader}>
            Manually reclaim Facebook data
          </h2>
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
          <h2 className={StyleSheet.columnHeader}>
            Manually reclaim Twitter data
          </h2>
          <Button
            onClick={() => window.open('https://twitter.com/login')}
            as={StyledTwitterButton}
          >
            Login to Twitter
          </Button>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="twitter">
                Download and unzip your data folder into the
                <strong> user_data </strong>
                directory in your SelfExplore folder.
              </Tooltip>
            }
          >
            <Button
              onClick={() =>
                window.open('https://twitter.com/settings/download_your_data')
              }
              as={StyledButton}
            >
              Download Twitter data
            </Button>
          </OverlayTrigger>
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
