import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { getTopProducts } from '../redux/actions/productAction';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { products, status, message } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  return (
    <>
      {status === 'pending' ? (
        <Loader />
      ) : status === 'error' ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
