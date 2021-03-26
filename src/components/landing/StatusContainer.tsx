import React from "react"
import { useSelector } from "react-redux";
import { Container, Tooltip, OverlayTrigger } from "react-bootstrap";
import StyleSheet from './landing.module.css';

const StatusContainer = () => {
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  const userTwtrData = useSelector((state) => state.TwitterReducer.userTwtrData);

  const renderTooltip = (props) => (
    <Tooltip className={StyleSheet.Tooltip} {...props}>
      RED = Your data is NOT stored where Reclaim can access it.
      <hr className={StyleSheet.StatusContainerDivider} />
      GREEN = Your data is stored locally and ready to explore!
    </Tooltip>
  );


  return (
    <>
      <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
      >
        <div className={StyleSheet.statusContainer}>
          <p className={StyleSheet.statusText}>Facebook:</p>
          <div
            className={userFbData ? StyleSheet.light : StyleSheet.redLight}
            />
          <p className={StyleSheet.statusText}>Twitter:</p>
          <div
            className={userTwtrData ? StyleSheet.light : StyleSheet.redLight}
            />
        </div>
      </OverlayTrigger>
    </>
  )
}

export default StatusContainer;
