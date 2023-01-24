import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState, useEffect } from 'react';
import { getUserDetails } from '../redux/actions/userAction';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const {
    userDetails: user,
    userDetailsStatus: status,
    userDetailsMessage: error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('password do not match');
    } else {
      // dispatch(registerUser(name, email, password));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2 className="text-center">User Profile</h2>
        {status === 'pending' || status === '' ? (
          <Loader />
        ) : status === 'error' ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            {message && <Message variant="danger">{error}</Message>}
            {status === 'error' && (
              <Message variant="danger">{message}</Message>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <div className="d-grid mt-3">
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Col>
      <Col md={9}></Col>
    </Row>
  );
};

export default ProfilePage;
