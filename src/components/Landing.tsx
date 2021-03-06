import React, { useState } from 'react';
import { Button, Container, Jumbotron } from 'react-bootstrap';
import facebookScriptIndex from '../automation/facebook/index';
import twitterScriptIndex from '../automation/twitter/index';
import ManualFacebookReclaim from './ManualReclaim/ManualFacebookReclaim';
import ManualTwitterReclaim from './ManualReclaim/ManualTwitterReclaim';
import StyleSheet from './onboarding.module.css';

const Landing = (props) => {
  const [scriptRunning, setScriptRunning] = useState(false);

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
        <ManualFacebookReclaim history={props.history} />
        <ManualTwitterReclaim history={props.history} />
      </Container>
    </div>
  );
};

export default Landing;
