import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getStore } from '../features/fakeStoreSlice';
import { NavLink } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Flex, Button, IconButton, Stack } from '@chakra-ui/react';

export default function Navbar() {
  const [open, setOpen] = useState('none');
  const { cart } = useSelector(getStore);
  const cartCount = cart.reduce((curr, item) => curr + item.count, 0);

  return (
    <div>
      <Stack>
        <Flex
          pl={2}
          pr={2}
          mt={5}
          mb={5}
          alignItems="center"
          justifyContent="space-between"
        >
          <NavLink exact to="/">
            <Button
              display={['none', 'none', 'flex', 'flex']}
              leftIcon={<FaHome />}
            >
              Home
            </Button>
          </NavLink>
          <Flex>
            <Flex
              alignItems="center"
              display={['none', 'none', 'flex', 'flex']}
            >
              <NavLink exact to="/cart">
                <Button leftIcon={<BsCart3 />} variant="outline">
                  Cart ({cartCount})
                </Button>
              </NavLink>
            </Flex>
            <IconButton
              size="lg"
              mr={2}
              aria-label="Open Menu"
              onClick={() => setOpen('flex')}
              icon={<GiHamburgerMenu />}
              display={['flex', 'flex', 'none', 'none']}
            />
          </Flex>
        </Flex>
      </Stack>
      <Flex
        w="100%"
        position="absolute"
        top={0}
        left={0}
        backgroundColor="gray.50"
        align="center"
        flexDirection="column"
        zIndex="20"
        height="100vh"
        justifyContent="center"
        display={open === 'none' ? 'none' : 'flex'}
      >
        <NavLink exact to="/">
          <Button mb={5} onClick={() => setOpen('none')} leftIcon={<FaHome />}>
            Home
          </Button>
        </NavLink>
        <NavLink exact to="/cart">
          <Button onClick={() => setOpen('none')} leftIcon={<BsCart3 />}>
            Cart ({cartCount})
          </Button>
        </NavLink>
      </Flex>
    </div>
  );
}
