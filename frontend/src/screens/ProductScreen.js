import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProductDetails,
  createProductReview,
  userPaymentRequest,
} from "../actions/productActions";
import axios from "axios";
import { sendEmail } from "../actions/userActions";
import { PRODUCT_REVIEW_RESET } from "../types/productConstants";
import Backward from "./Backward";
const ProductScreen = ({ match, history }) => {
  const [data1, setData1] = useState("");
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");

  const [sendMail, setSendMail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [recommandbooks, setrecommandbooks] = useState("");
  const [recom, setRecom] = useState([]);

  const dispatch = useDispatch();
  const emailReducer = useSelector((state) => state.emailReducer);
  const {
    loading: loadingEmail,
    error: errorEmail,
    data: dataEmail,
  } = emailReducer;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  useEffect(async () => {
    if (successReview) {
      setComment("");
      dispatch({
        type: PRODUCT_REVIEW_RESET,
      });
    }
    dispatch(listProductDetails(match.params.id));

    const { data } = await axios.get(`/api/products/${match.params.id}`);
    var recom = [];
    setData1(data);
    if (data.recbook.length != 0) {

      for (var i = 0; i < data.recbook[0].searched_book.length; i++) {
        console.log(data.product.description);
        recom[i] = (
          <Col xs={6} sm={2} md={4} lg={3} className="mb-4" key={i}>
            <Card style={{ width: "auto", height: "auto" }} border="primary">
              <Card.Img
                variant="top"
                src={data.recbook[0].searched_book[i].book_url}
              />
              <Card.Body>
                <Card.Title>
                  <strong>Book Name </strong> :-{" "}
                  <u>{data.recbook[0].searched_book[i].book_title}</u>
                </Card.Title>
                <Card.Text>
                  Book Author :- {data.recbook[0].searched_book[i].book_author}
                </Card.Text>
                {/* <Button variant="primary">Just Google it </Button> */}
              </Card.Body>
            </Card>
          </Col>
        );
      }
    }
    setRecom(recom);

    setrecommandbooks(recom);
    console.log(data.recbook[0].searched_book);
  }, [match.params.id, dispatch, successReview]);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, comment));
  };
  const emailSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);

    dispatch(
      sendEmail(
        product?.seller?.selleremail,
        text,
        userData?.name,
        userData?.address,
        product?.name,
        userData?.email,
        userData?.contact?.phone_no
      )
    );

    setText("");

    setSendMail(false);
    setTimeout(() => {
      setEmailSent(false);
    }, 10000);
  };

  const handlePurchaseBook = async (price) => {

    // const { token } = cookies;
    console.log(price);
    console.log('on book buy');
    try {

      const response = await userPaymentRequest(price);
      console.log(response)
      console.log(response.data.data.id);

      const options = {
        key: "rzp_test_dRlCT5WmwmpnBu",
        amount: 200,
        currency: "INR",
        name: 'Demo',
        description: 'Test Payment',
        image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
        order_id: response.data.data.id,
        handler: async (response) => {
          console.log(response);
          console.log("booking success");
          // props.postTableBook(props.tableId)

          // try {
          // const verificationResponse = await userPaymentVerify(response.razorpay_order_id, response.razorpay_payment_id,response.razorpay_signature);

          // console.log(verificationResponse); 

          //     if (verificationResponse.type === 'data') {

          //         const response = await userbooking(token, params, user, doctor, timingSlot, textfeelling, meetingMode);

          //         if (response.type === 'data') {


          //         } else {

          //         }
          //     } else {

          //     }
          // } catch (error) {

          // }
          // handle successful payment response
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '+919876543210'
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#F37254'
        }
      };
      console.log(options);
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      // dispatch(hideLoading());
      // message.error("some thing went wrong");
    }
  };


  const sendEMAIL = (price) => {
    //console.log("hero");
    console.log(price);
    handlePurchaseBook(price);


    setSendMail(true);
  };
  const cancelHandler = () => {
    setSendMail(false);
  };
  return (
    <>
      <Link to="/">
        <div style={{ height: '42px', width: '42px' }}>
          <Backward />
        </div>
      </Link>
      <br />
      {userData && userData._id === product.user && (
        <Link
          to={`/admin/product/${match.params.id}/edit`}
          className="btn btn-primary my-3"
        >
          Edit Book Details
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row className="row mb-2">
            <Col md={6} className="image-area">
              {/* <Carousel> */}
              {product.images.map((image) => (
                // <Carousel.Item key={image._id}>
                <Image
                  className="d-block w-100"
                  src={image?.image1}
                  alt="First slide"
                />
              ))}
            </Col>

            <Col className="borderaround setheight" md={6}>
              <p className="details">
                <i className="fas fa-info"></i> General Details
              </p>

              <Row>
                <Col className="product  " md={4} sm={4} xs={4}>
                  <ul>
                    <li> Product Id:</li>

                    <li> Posted On:</li>
                    <li> Expires On:</li>
                    <li> Product:</li>
                  </ul>
                </Col>
                <Col md={8} sm={8} xs={8}>
                  <ul>
                    <li>{product._id}</li>

                    <li>{product?.createdAt?.substring(0, 10)}</li>
                    <li>{product?.expiresOn?.substring(0, 10)}</li>
                    <li> {product.name}</li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>

          {loadingEmail && <Loader />}
          {errorEmail && <Message variant="danger">{errorEmail}</Message>}
          {/* {console.log(dataEmail?.response)} */}
          {dataEmail && emailSent && (
            <Message variant="success">{dataEmail.response}</Message>
          )}
          {sendMail && userData && (
            <Row id="email" className="mt-5">
              <Col md={10} sm={12} className="formAround">
                <Form onSubmit={emailSubmit}>
                  <div className="text-area1">
                    <span className="text-area2">Send Email</span>

                    <p className="text-area3">
                      Get in touch with {product?.seller?.sellername}
                    </p>
                  </div>
                  <Row>
                    <Col md={4} sm={4} xs={4}>
                      <ul className="marginshift">
                        <p>{""}</p>
                        <br />
                        <li className="mt-2">Your Name:</li>
                        <li>Your Email:</li>
                        <li>Your Phone No:</li>
                        <li>Your Message:</li>
                      </ul>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                      <p className="cross">
                        <button
                          onClick={cancelHandler}
                          className=" cancel m-auto "
                        >
                          {" "}
                          <i className="far fa-window-close"></i>
                        </button>
                      </p>
                      <li>{userData.name}</li>
                      <li>{userData.email}</li>
                      <li>{userData?.contact?.phone_no}</li>
                      <li>
                        <textarea
                          style={{ maxWidth: "100%", borderRadius: "5px" }}
                          id="w3review"
                          name="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          rows="8"
                          cols="55"
                          required
                        />
                      </li>
                    </Col>
                    <button className="button " type="submit">
                      Send Email
                    </button>
                  </Row>
                </Form>
              </Col>
            </Row>
          )}
          <Row>
            <Col className="borderaround mt-5" md={10}>
              <p className="details">
                <i className="fas fa-info"></i> Seller Details
              </p>

              <Row className="mb-2">
                <Col className="product" md={4} sm={2} xs={2}>
                  <ul>
                    <li> Name:</li>

                    <li> Email:</li>
                    <li> Address:</li>
                    <li>Phone:</li>
                    <li></li>
                  </ul>
                </Col>
                <Col md={8} sm={10} xs={10}>
                  <ul>
                    <li>{product?.seller?.sellername}</li>

                    <li>
                      {/* {product?.seller?.selleremail}{' '} */}
                      <span>
                        <button
                          className="emailbutton btn-success"
                          onClick={() => sendEMAIL(product?.Cost?.price)}
                        >
                          Send Email
                        </button>
                      </span>
                    </li>
                    <li>{product?.seller?.selleraddress}</li>
                    <li>
                      {product?.seller?.phoneNo?.mobile}{" "}
                      <span>
                        {product?.seller?.phoneNo?.isVerified ? (
                          <span>
                            <i className="fas fa-mobile-alt"></i>
                            <span className="underlined">verified</span>
                          </span>
                        ) : (
                          <span>
                            <i className="fas fa-mobile-alt"></i>
                            <span className="underlined">unverified</span>
                          </span>
                        )}{" "}
                      </span>
                    </li>
                    <li></li>
                  </ul>
                </Col>
              </Row>
              {sendMail && !userData && (
                <Message variant="danger">
                  You need to be logged in to use this feature.{" "}
                  <span>
                    <Link to="/login">Log In</Link> to Continue
                  </span>
                </Message>
              )}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="borderaround mt-5 " md={10}>
              <p className="details">
                <i className="fas fa-info"></i> Pricing Details
              </p>
              <Row>
                <Col className="product" md={6} sm={6} xs={4}>
                  <ul>
                    <li>Total Price:</li>
                    {product?.Cost?.negotiable && <li>Negotiable:</li>}
                  </ul>
                </Col>
                <Col md={6} sm={6} xs={8}>
                  <ul>
                    <li> Rs {product?.Cost?.price}</li>
                    {product?.Cost?.negotiable && <li>Yes</li>}
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="borderaround mt-5" md={10} sm={12} xs={12}>
              <p className="details ">
                <i className="fas fa-info"></i> Description
              </p>
              <p className="detailsdescription">{product.description}</p>
            </Col>
          </Row>
          <Row>
            <Col className="borderaround mt-5" md={10}>
              <p className="details">
                <i className="fas fa-info"></i> Delivery Information
              </p>
              <Row>
                <Col className="product" md={6} sm={6} xs={5}>
                  <ul>
                    <li>Delivery Area:</li>
                    <li>Delivery Charge:</li>
                  </ul>
                </Col>
                <Col md={6} sm={6} xs={7}>
                  <ul>
                    <li>{product?.shippingAddress?.address} </li>
                    <li>
                      {" "}
                      Rs {""}
                      {product?.shippingAddress?.shippingCharge}
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col
              className="borderaround mt-5"
              style={{ maxHeight: "auto" }}
              md={10}
              sm={12}
              xs={12}
            >
              <p className="details">
                <i className="fas fa-info"></i> Recommended Books
              </p>
              <Row>
                {/* <Container className="d-flex justify-content-between" style={{ width: 'auto', height: '60%' }}> */}
                <Container className="d-flex  ">
                  <Row>{recom}</Row>
                </Container>
              </Row>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <h4>Buyer's Speak</h4>
              {product.reviews.length === 0 && (
                <Message variant="primary">Be the First One to Review</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    {/* <strong>{review.name}</strong>
                    <p>{review.createdAt.substring(0, 10)}</p> */}
                    <p>
                      Q.<span className="comment"> {review.comment} </span>
                      <span className="review">
                        <span style={{ color: "#32a897", fontWeight: "800" }}>
                          --Posted By <strong>{review.name}</strong> on{" "}
                          <strong> {review.createdAt.substring(0, 10)} </strong>{" "}
                        </span>
                      </span>
                    </p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <p>Post Your Speak</p>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}

                  {loadingReview && <Loader />}
                  {userData ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="comment">
                        {/* <Form.Label>Comment</Form.Label> */}
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Post
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="primary">
                      You must <Link to="/login">Log In</Link> to post your
                      speak{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
