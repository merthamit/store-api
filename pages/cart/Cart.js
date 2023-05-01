import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocalShipping } from 'react-icons/md';
import {
  addToCart,
  getStore,
  removeToCart,
} from '../../features/fakeStoreSlice';
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import CartModal from '../../components/Modal';

export default function Cart() {
  const { cart } = useSelector(getStore);
  const [finishPay, setFinishPay] = useState(false);
  const dispatch = useDispatch();
  const cartCount = cart.reduce((curr, item) => curr + item.count, 0);
  const paymentAmount = cart
    .reduce((curr, item) => curr + item.count * item.price, 0)
    .toFixed(2);

  const MemoCart = React.memo(({ item }) => (
    <Flex
      key={item.id}
      alignItems="center"
      padding="5"
      margin="5"
      borderWidth="1px"
    >
      <Box borderWidth="2px" padding={2}>
        <Image width="50px" objectFit="contain" src={item.image} />
      </Box>
      <Flex alignItems="center" justifyContent="space-between" flex={3}>
        <Stack ml="5">
          <Text fontSize="md">{item.title}</Text>
          <Text fontSize="md">{(item.price * item.count).toFixed(2)}$</Text>
        </Stack>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Button onClick={() => dispatch(addToCart(item, 1))}>+</Button>
          <Text fontSize="md">{item.count}</Text>
          <Button onClick={() => dispatch(removeToCart(item))}>-</Button>
        </Flex>
      </Flex>
    </Flex>
  ));

  const renderedCarts = cart.map((item) => (
    <MemoCart key={item.id} item={item} />
  ));

  return (
    <Container maxW="container.xl">
      <CartModal open={finishPay} setOpen={setFinishPay} />
      <Flex
        flexDirection={['column', 'column', 'row', 'row']}
        justifyContent="space-between"
      >
        <Box order={[2, 2, 1, 1]} borderWidth="1px" flex="3">
          <Flex
            alignItems="center"
            borderBottomWidth="1px"
            color="green.400"
            padding="5px"
          >
            <Text>Free Shipment</Text>
            <Icon as={MdLocalShipping} ml="5px" />
          </Flex>
          {renderedCarts}
        </Box>
        <Box
          order={[1, 1, 2, 2]}
          mb={['5', '5', '0', '0']}
          padding="4"
          height="150px"
          flex="1"
          borderWidth="1px"
          color="black"
        >
          <Text fontSize="md">Products ({cartCount})</Text>
          <Text fontSize="4xl">{paymentAmount}$</Text>
          <Button onClick={() => setFinishPay(true)} width="100%" size="sm">
            Pay
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}
