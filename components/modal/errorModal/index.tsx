import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { AiOutlineAlert } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const ErrorModalComponent: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
          >
            <Box color="red" mt={10} borderRadius={50} p={3} boxShadow={'lg'}>
              <BiError size={50} />
            </Box>
            <Text color="red" fontWeight="bold" fontSize="lg" mt={2}>
              {title}
            </Text>
            <Text fontSize="large" color="black.500" mt={4}>
              {description}
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModalComponent;
