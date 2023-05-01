import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

export default function CartModal({ money, open, setOpen }) {
  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xl">Total: {money}</Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => setOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3}>
              Pay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
