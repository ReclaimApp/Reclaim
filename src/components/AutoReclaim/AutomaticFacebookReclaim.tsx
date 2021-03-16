import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { FaFacebook } from 'react-icons/fa';
import Styled from 'styled-components';
import StyleSheet from './autoReclaim.module.css';

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

const AutomaticFacebookReclaim = ({ history, scriptRunning, startFacebookScript }) => {
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  return (
    <Col className={StyleSheet.column}>
      <FaFacebook className={StyleSheet.iconFacebook} />
      <h2 className={StyleSheet.columnHeader}>
        Automatically reclaim Facebook data
      </h2>
      <Button
        className={scriptRunning ? StyleSheet.autoFbButtonDisabled : StyleSheet.autoFbButton }
        disabled={scriptRunning}
        onClick={startFacebookScript}
      >
        Reclaim Facebook
      </Button>
      {userFbData ? (
        <Button as={StyledButton} onClick={() => history.push('/categories')}>
          Explore Facebook
        </Button>
      ) : (
        <Button disabled as={StyledButtonDisabled}>
          Explore Facebook
        </Button>
      )}
    </Col>
  );
};

export default AutomaticFacebookReclaim;
