import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, getStore } from '../../features/fakeStoreSlice';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { discount } from '../../helpers/discount';

export default function Home() {
  const { products, error, status } = useSelector(getStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status]);

  return (
    <>
      {error && <p>{error}</p>}
      {status === 'loading' && (
        <Flex height="100vh" width="100vh">
          <Spinner position="absolute" top="50%" left="50%" />
        </Flex>
      )}
      {products && (
        <Grid
          mb={2}
          pl={2}
          pr={2}
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(5, 1fr)',
          ]}
          gap={6}
        >
          {products.map((product) => {
            const { newPrice, percent } = discount(product.price);
            return (
              <GridItem
                key={product.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Image
                    src={product.image}
                    boxSize="250px"
                    objectFit="contain"
                    padding="5"
                  />
                </Box>

                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      New
                    </Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {product.category}
                    </Box>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {product.title}
                  </Box>

                  <Box>
                    <Flex alignItems="center" fontSize="sm">
                      <Text color="gray.600" as="del">
                        {newPrice}$
                      </Text>
                      <Badge
                        ml="2"
                        borderRadius="full"
                        px="2"
                        colorScheme="green"
                      >
                        {percent}
                      </Badge>
                    </Flex>
                    <Text color="green.700" fontWeight="bold" fontSize="2xl">
                      {product.price}$
                    </Text>
                  </Box>
                  <Link to={`/product/${product.id}`}>
                    <Button width="100%">Buy</Button>
                  </Link>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      )}
    </>
  );
}

// Image
// PromiseRejectionEvent
// title
// category
// raing objectTraps
