import React from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
// import './RecommendSection.css';

const RecommendSection = () => {
  return (
    <div className="recommend-section" style={{ margin:'10px'}}>
      <Row className='row mb-2'>
        <Col md={6} className='image-area'>
          <Carousel>
            <Carousel.Item>
              <Image
                className='d-block w-100'
                src='https://www.jquery-az.com/html/images/banana.jpg'
                alt='First slide'
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className='d-block w-100'
                src='https://www.jquery-az.com/html/images/banana.jpg'
                alt='Second slide'
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className='d-block w-100'
                src='https://www.jquery-az.com/html/images/banana.jpg'
                alt='Third slide'
              />
            </Carousel.Item>
          </Carousel>
        </Col>

        {/* <Col className='borderaround setheight' md={6}> */}
        <div className="recommend-section" style = {{margin : '10px 0px 0px 10px'}}>

          <Carousel>
            <Carousel.Item>
              <Image
                className='d-block w-100 mb-2'
                src='https://www.jquery-az.com/html/images/banana.jpg'
                alt='Book 1'
              />
              <Carousel.Caption>
                <h3>Book 1</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className='d-block w-100 mb-2'
                src='https://www.jquery-az.com/html/images/banana.jpg'
                alt='Book 2'
              />
              <Carousel.Caption>
                <h3>Book 2</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className='d-block w-100 mb-2'
                src='https://www.jquery-az.com/html/images/banana.jpg'
                alt='Book 3'
              />
              <Carousel.Caption>
                <h3>Book 3</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className='d-block w-100 mb-2'
                src='https://www.jquery-az.com/html/images/banana.jpg'
                alt='Book 4'
              />
              <Carousel.Caption>
                <h3>Book 4</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </div>
        {/* </Col> */}
      </Row>
    </div>
  );
};

export default RecommendSection;
