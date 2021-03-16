import React, { useState } from 'react';
import {
  Button,
  Container,
  Jumbotron,
} from 'react-bootstrap';
import Styled from 'styled-components';
import facebookScriptIndex from '../automation/facebook/index';
import twitterScriptIndex from '../automation/twitter/index';
import AutomaticFacebookReclaim from './AutoReclaim/AutomaticFacebookReclaim';
import AutomaticTwitterReclaim from './AutoReclaim/AutomaticTwitterReclaim';
import StyleSheet from './landing.module.css';

const StyledButton = Styled.button`
  width: 40%;
  margin: 1% auto;
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
    alert('Please enter your Facebook credentials into the login page')
    return new Notification('Reclaiming', {
      body: 'The automatic reclaim process has begun for Facebook'
    })
  };

  const startTwitterScript = () => {
    // setScriptRunning(true);
    twitterScriptIndex();
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
      <Container className={StyleSheet.footerContainer}>
          <p className={StyleSheet.footerText}>
            In case the automatic reclaim process above is not working these pages will walk you through the manual steps to reclaim your data and make it available in this app.
          </p>
        <Button onClick={() => props.history.push('/manualFacebook')} as={StyledButton}>Manual data download Facebook</Button>
        <Button onClick={() => props.history.push('/manualTwitter')} as={StyledButton}>Manual data download Twitter</Button>
      </Container>
    </div>
  );
};

export default Landing;
