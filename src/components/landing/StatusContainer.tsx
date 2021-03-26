import React from "react"
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import StyleSheet from './landing.module.css';

const StatusContainer = () => {
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  const userTwtrData = useSelector((state) => state.TwitterReducer.userTwtrData);

  return (
    <Container>
      <h1 className={StyleSheet.header}>Reclaim</h1>
      <p className={StyleSheet.headerText}>Status</p>
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
    </Container>
  )
}

export default StatusContainer;
