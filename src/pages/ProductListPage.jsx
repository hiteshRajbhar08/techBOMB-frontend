import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  createProduct,
  deleteProductById,
  listProducts,
} from '../redux/actions/productAction';

const ProductListPage = () => {
  const dispatch = useDispatch();

  const { products, status, message } = useSelector((state) => state.products);

  const {
    deleteStatus,
    deleteMessage,
    createProductStatus,
    createProductMessage,
    createdProduct,
  } = useSelector((state) => state.product);

  const { userInfo } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (createProductStatus === 'success') {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else if (createProductStatus !== 'pending') {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    deleteStatus,
    createProductStatus,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProductById(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col xs={10}>
            <h1>Products</h1>
          </Col>
          <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Row>
      </Container>
      {deleteStatus === 'error' && (
        <Message variant="danger">{deleteMessage}</Message>
      )}
      {createProductStatus === 'error' && (
        <Message variant="danger">{createProductMessage}</Message>
      )}
      {status === 'pending' || status === '' ? (
        <Loader />
      ) : status === 'error' ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListPage;
