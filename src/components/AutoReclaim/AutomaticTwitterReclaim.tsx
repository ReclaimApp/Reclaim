import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import Styled from 'styled-components';
import StyleSheet from '../landing.module.css';

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

const AutomaticTwitterReclaim = ({ history, scriptRunning, startTwitterScript }) => {
  const userTwtrData = useSelector(
    (state) => state.TwitterReducer.userTwtrData
  );
  return (
    <Col className={StyleSheet.column}>
      <h2 className={StyleSheet.columnHeader}>
        Automatically reclaim Twitter data
      </h2>
      <Button
        className={scriptRunning ? StyleSheet.autoTwitterButtonDisabled : StyleSheet.autoTwitterButton }
        disabled={scriptRunning}
        onClick={startTwitterScript}
      >
        Reclaim Twitter
      </Button>
      {userTwtrData ? (
        <Button as={StyledButton} onClick={() => history.push('/twitter')}>
          Explore Twitter
        </Button>
      ) : (
        <Button disabled as={StyledButtonDisabled}>
          Explore Twitter
        </Button>
      )}
    </Col>
  );
};

export default AutomaticTwitterReclaim;
