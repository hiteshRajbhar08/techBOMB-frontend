import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { useEffect } from 'react';
import { loginUser } from '../redux/actions/userAction';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { notification } = useSelector((state) => state.ui);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };

  return (
    <FormContainer>
      <h1 className="text-center">Sign In</h1>
      {notification.status === 'pending' ? (
        <Loader />
      ) : (
        <div>
          {notification.status === 'error' && (
            <Message variant="danger">{notification.message}</Message>
          )}
          <Form onSubmit={submitHandler}>
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
            <div className="d-grid mt-3">
              <Button type="submit" variant="primary">
                Sign In
              </Button>
            </div>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </FormContainer>
  );
};

export default LoginPage;
