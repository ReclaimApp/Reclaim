import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import Styled from 'styled-components';
import StyleSheet from '../onboarding.module.css';

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

const ManualFacebookReclaim = ({ history }) => {
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  return (
    <Col className={StyleSheet.columnOpen}>
      <h2 className={StyleSheet.columnHeader}>
        Manually reclaim Facebook data
      </h2>
      <Button as={StyledFbButton}>Login to Facebook</Button>
      <Button as={StyledButton}>Download Facebook data</Button>
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

export default ManualFacebookReclaim;
