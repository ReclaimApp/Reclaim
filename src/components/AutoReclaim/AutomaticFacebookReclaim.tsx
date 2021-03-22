import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { FaFacebook } from 'react-icons/fa';
import FacebookReclaimDisplay from './FacebookReclaimDisplay';
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

const AutomaticFacebookReclaim = ({ history, scriptRunning, setScriptRunning, startFacebookScript }) => {
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  const dataStatus = useSelector(state => state.FacebookReducer.dataStatus);

  useEffect(() => {
    if (dataStatus == 'The automatic reclaim process for Facebook has completed succesfully') {
      setScriptRunning(false)
    }
  }, [dataStatus])

  return (
    <Col className={StyleSheet.column}>
      <FaFacebook className={StyleSheet.iconFacebook} />
      <h2 className={StyleSheet.columnHeader}>
        Automatically reclaim Facebook data
      </h2>
      {scriptRunning
        ? <FacebookReclaimDisplay status={dataStatus} />
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
            style={userFbData ?{opacity: '1'} : {opacity: '0.6'}}
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
