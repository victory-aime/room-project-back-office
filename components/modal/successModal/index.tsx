import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { BiCheck, BiError } from 'react-icons/bi';

interface ModalProps {
  title: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef?: React.RefObject<any>;
  finalFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
  description: string;
}

const SuccessModalComponent: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  description,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent className="rounded-md bg-white px-4 py-6 shadow-lg">
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
          >
            <Box
              color="green.600"
              mt={10}
              borderRadius={50}
              p={3}
              boxShadow={'lg'}
            >
              <BiCheck size={50} />
            </Box>
            <Text color="green.600" fontWeight="bold" fontSize="lg" mt={2}>
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

export default SuccessModalComponent;
