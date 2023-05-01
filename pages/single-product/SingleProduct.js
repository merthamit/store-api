import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar } from 'react-icons/ai';
import {
  addToCart,
  getSingleProduct,
  getStore,
} from '../../features/fakeStoreSlice';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';

export default function SingleProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, status } = useSelector(getStore);

  const [count, setCount] = useState(1);

  const handleCountPlus = () => {
    if (count < 10) {
      setCount((prevState) => prevState + 1);
    }
  };

  const handleCountMinus = () => {
    if (count > 1) {
      setCount((prevState) => prevState - 1);
    }
  };

  const handleBuy = () => {
    dispatch(addToCart(singleProduct, count));
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [productId]);

  return (
    <>
      {status === 'loading' && (
        <Flex height="100vh" width="100vh">
          <Spinner position={'absolute'} top="50%" left="50%" />
        </Flex>
      )}
      {Object.keys(singleProduct).length > 0 && (
        <Flex
          justifyContent="space-between"
          flexDirection={['column', 'column', 'row', 'row']}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          padding="5"
        >
          <Box flex={1}>
            <Image
              width="100%"
              height="60vh"
              objectFit={'contain'}
              src={singleProduct.image}
              borderWidth="1px"
              padding="5"
            />
          </Box>
          <Box flex={3}>
            <Text fontSize="2xl" isTruncated>
              {singleProduct.title}
            </Text>
            <Text fontSize="xl" color="blue.400">
              {singleProduct.category}
            </Text>
            <Box mt="2" alignItems="center">
              <Box as="span" color="gray.600" fontSize="sm">
                Reviews {singleProduct.rating.rate}
              </Box>
              <Flex>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <AiFillStar
                      key={i}
                      color={
                        i < Math.floor(singleProduct.rating.rate)
                          ? 'gold'
                          : 'gray'
                      }
                    />
                  ))}
              </Flex>
            </Box>

            <Text fontSize="4xl">{singleProduct.price}$</Text>
            <Flex flexDirection="column">
              <ButtonGroup mb="5" alignItems="center" variant="outline">
                <Button onClick={handleCountPlus}>+</Button>
                <Box>
                  <Text>{count} count</Text>
                </Box>
                <Button onClick={handleCountMinus}>-</Button>
              </ButtonGroup>
              <Button onClick={handleBuy} width="100%">
                Add to cart
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}
