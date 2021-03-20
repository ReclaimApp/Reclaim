import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { FaFacebook } from 'react-icons/fa';
import Styled from 'styled-components';
import StyleSheet from './autoReclaim.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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

const reclaimSteps = (status) => {
  return (
    <div className={StyleSheet.stepsContainer}>
      <p className={StyleSheet.stepsText}>Reclaiming</p>
      <p className={StyleSheet.stepsText}>{status}</p>
      <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
    </div>
  )
}

const AutomaticFacebookReclaim = ({ history, scriptRunning, startFacebookScript }) => {
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  const dataStatus = useSelector(state => state.FacebookReducer.dataStatus);
  return (
    <Col className={StyleSheet.column}>
      <FaFacebook className={StyleSheet.iconFacebook} />
      <h2 className={StyleSheet.columnHeader}>
        Automatically reclaim Facebook data
      </h2>
      {scriptRunning
        ? reclaimSteps(dataStatus)
        :
        <>
          <Button
            className={scriptRunning ? StyleSheet.autoFbButtonDisabled : StyleSheet.autoFbButton }
            disabled={scriptRunning}
            onClick={startFacebookScript}
            >
            Reclaim Facebook
          </Button>
          <Button
            disabled={userFbData == false}
            as={StyledButton}
            style={userFbData ?{opacity: '1'} : {opacity: '0.8'}}
            onClick={() => history.push('/categories')}
          >
            Explore Facebook
          </Button>
        </>
        }
    </Col>
  );
};

export default AutomaticFacebookReclaim;
