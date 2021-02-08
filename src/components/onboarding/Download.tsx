import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Download = (props) => {
  return (
    <div className="landing">
      <h1 onClick={() => props.history.push('/')} className="logo">
        fbexplorer
      </h1>
      <div className="landing-container">
        <h3>
          You will be taken to the download page where you should see what looks
          like the below image
        </h3>
        <img
          src="./build/media/fb-download.jpg"
          className="download-image"
          alt="download example"
        />
        <ListGroup>
          <ListGroup.Item>
            {' '}
            - Choose "All of my data" and make sure the format is HTML with
            media quality set to high
          </ListGroup.Item>
          <ListGroup.Item>
            {' '}
            - It will take a few minutes to "create" your file before you can
            download
          </ListGroup.Item>
          <ListGroup.Item>
            {' '}
            - Once the file is downloaded extract it from it's .zip format, now
            you can keep it forever and explore it here anytime!
          </ListGroup.Item>
        </ListGroup>
        <h2 className="step">Step 2: Download your Facebook data</h2>
        <a
          className="download-button"
          href="https://www.facebook.com/dyi/?x=AdkadZSUMBkpk0EF&referrer=yfi_settings"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Data
        </a>
        <div className="button-container-download">
          <Link to="/" className="next-download">
            Back
          </Link>
          <Link to="/drop" className="next-download">
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Download;
