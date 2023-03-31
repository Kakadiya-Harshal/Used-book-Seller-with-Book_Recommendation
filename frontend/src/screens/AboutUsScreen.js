import React from 'react';
import { Row, Col } from 'react-bootstrap';

import '../App.css';

const AboutUsScreen = () => {
  return (
    <div className='about-body'>
      <Row>
        <Col md={12}>
          <div className='about-heading'>
            <h1 style={{ fontSize: '36px' }}>Who are We?</h1>
            <p style={{ fontSize: '20px' }}>
              We are third-year IT students at DDIT University. While we are not professionals, we created this website to allow anyone to sell a used book that could help someone else.
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className='developer-info'>
            <h1 style={{ fontSize: '36px' }}>Developer</h1>
            <p style={{ fontSize: '20px' }}>
              This website was designed and developed by Kakadiya Harshal and Jay Kantariya.
            </p>
            <h3 style={{ fontSize: '28px' }}>Contact Details</h3>
            <p style={{ fontSize: '20px' }}>
              <i className='fas fa-phone'></i> 9909335856
            </p>
            <p style={{ fontSize: '20px' }}>
              <i className='fas fa-envelope-square'></i>{' '}
              <a target='_blank' rel='noreferrer' href={`mailto:patelharshal@gmail.com`}>
                patelharshal@gmail.com
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUsScreen;
