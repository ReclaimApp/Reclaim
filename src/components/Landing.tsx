import React, { useState } from 'react';
import Styled from 'styled-components';
import { Button, Container, Jumbotron } from 'react-bootstrap';
import facebookScriptIndex from '../automation/facebook/index';
import twitterScriptIndex from '../automation/twitter/index';
import AutomaticFacebookReclaim from './ManualReclaim/AutomaticFacebookReclaim';
import AutomaticTwitterReclaim from './ManualReclaim/AutomaticTwitterReclaim';
import StyleSheet from './onboarding.module.css';

const StyledButton = Styled.button`
  width: 40%;
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

const Landing = (props) => {
  const [scriptRunning, setScriptRunning] = useState(false);

  const startFacebookScript = () => {
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
      <Container className={StyleSheet.parentContainer}>
        <AutomaticFacebookReclaim startFacebookScript={startFacebookScript} scriptRunning={scriptRunning} history={props.history} />
        <AutomaticTwitterReclaim startTwitterScript={startTwitterScript} scriptRunning={scriptRunning} history={props.history} />
      </Container>
      <Button as={StyledButton}>Manual data download Facebook</Button>
      <Button as={StyledButton}>Manual data download Twitter</Button>
    </div>
  );
};

export default Landing;
