import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const AboutUsScreen = () => {
  return (
    <div className='aboutbody'>
      <Row>
        <Col md={3}></Col>
        <Col md={6} className='aboutpage'>
          <h1>Who are We?</h1>
          <p>
            We are third-year IT students at the DDIT University.
            Indeed, we are not professionals, but we created this website to allow anyone to sell a used book that could help someone else.
          </p>
        </Col>
        <Col md={3}></Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={6} className='aboutpage1'>
          <h1>Developer</h1>
          <p>
            Designed and developed by Kakadiya Harshal and Jay Kantariya
            {/* <a href='https://upendradhamala.com.np' target='_blank'> */}

            {/* </a>{' '} */}
          </p>
          {/* <h3>Who am I?</h3>
          <p>
            I am Upendra Dhamala. I am a native resident of Achham, Nepal. I am
            currently studying Computer Engineering(final year) at IOE, WRC
            Pokhara. There might be some bugs in this website as I am not any
            professional and currently a web developer in making.
          </p> */}
          <h3>Contact Details</h3>
          <i className='fas fa-phone'></i> 9909335856
          <br />
          <i className='fas fa-envelope-square'></i>{' '}
          <a target='_blank' href={`mailto:patelharshal@gmail.com`}>
            patelharshal@gmail.com
          </a>
          <br />
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  )
}

export default AboutUsScreen
