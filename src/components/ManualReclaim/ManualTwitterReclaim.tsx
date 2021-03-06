import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import Styled from 'styled-components';
import StyleSheet from '../onboarding.module.css';

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

const ManualTwitterReclaim = ({ history }) => {
  const userTwtrData = useSelector(
    (state) => state.TwitterReducer.userTwtrData
  );
  return (
    <Col className={StyleSheet.columnOpen}>
      <h2 className={StyleSheet.columnHeader}>Manually reclaim Twitter data</h2>
      <Button
        onClick={() => window.open('https://twitter.com/login')}
        as={StyledTwitterButton}
      >
        Login to Twitter
      </Button>
      <Button
        onClick={() =>
          window.open('https://twitter.com/settings/download_your_data')
        }
        as={StyledButton}
      >
        Download Twitter data
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

export default ManualTwitterReclaim;
