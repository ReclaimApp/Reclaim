import React from 'react'
import { Button, Col } from 'react-bootstrap';
import Styled from 'styled-components';
import StyleSheet from "./manualReclaim.module.css"
import fbDownload from "../../../assets/images/fb-download.jpg"

const StyledButton = Styled.button`
  width: 50%;
  margin: 2% auto;
  padding: 1%;
  font-size: 1.3rem;
  background-color: #4b3f72;
  color: #fff;
  border: 1px solid oldlace;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: 1600px) and (min-height: 900px) {
    font-size: 1.5rem;
  }
`;

const HomeButton = Styled.button`
  width: 10%;
  margin: 0% auto;
  padding: 0.5%;
  background: royalBlue;
  color: #fff;
  border: 1px solid oldlace;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: 1600px) and (min-height: 900px) {
    font-size: 1.5rem;
  }
`;

const ManualFacebookReclaim = (props) => {
  return (
    <div className={StyleSheet.landing}>
      <h2 className={StyleSheet.header}>
          Manually reclaim Facebook data
      </h2>
      <Button as={HomeButton} onClick={() => props.history.push('/')}>Home</Button>
      <Col className={StyleSheet.column}>
        <p className={StyleSheet.step}>Step 1: Login to Facebook</p>
        <Button onClick={() => window.open('http://facebook.com/login')} as={StyledButton}>Login</Button>
        <p className={StyleSheet.step}>Step 2: request a copy</p>
        <Button onClick={() => window.open('https://www.facebook.com/dyi/?x=AdkadZSUMBkpk0EF&referrer=yfi_settings')} as={StyledButton}>Download Your Information</Button>
        <p className={StyleSheet.subtext}>Click 'create file' and make sure the Date Range, Format, and Media Quality are the same as the image below</p>
        <img className={StyleSheet.downloadImg} src={fbDownload} alt='Facebook data download component for "requesting a copy"'/>
        <p className={StyleSheet.subtext}>Facebook is now creating your file which will take some time</p>
        <br/>
        <p className={StyleSheet.step}>Step 3: Download your data from 'Available Copies' tab</p>
        <Button onClick={() => window.open('https://www.facebook.com/dyi/?x=AdkadZSUMBkpk0EF&referrer=yfi_settings')} as={StyledButton}>Download Your Information</Button>
        <p className={StyleSheet.subtext}>Finally unzip your data folder and place it in a folder called 'your_data' in your Documents folder</p>
        <p className={StyleSheet.subtext}>Urgent: If there is no folder called 'your_data' in your Documents you must create that folder and place your data inside of it for the app to function</p>
      </Col>
    </div>
  )
}

export default ManualFacebookReclaim;
