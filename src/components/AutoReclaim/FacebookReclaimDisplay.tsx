import React from 'react'
import StyleSheet from './autoReclaim.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const FacebookReclaimDisplay = ({status}) => {
  return (
    <div className={StyleSheet.stepsContainer}>
      <p className={StyleSheet.stepsText}>Progress:</p>
      <p className={StyleSheet.stepsText}>{status}</p>
      <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
    </div>
  )
}

export default FacebookReclaimDisplay;
