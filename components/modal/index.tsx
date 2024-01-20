import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
} from '@chakra-ui/react';

interface ModalProps {
  title: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef?: React.RefObject<any>;
  finalFocusRef?: React.RefObject<any>;
  children: React.ReactNode;
  onSubmit?: () => void;
  isSuccess?: boolean;
  isError?: boolean;
  size?: string;
  height?: number;
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  primaryButtonLabel,
  secondaryButtonLabel,
  isOpen,
  onClose,
  onSubmit,
  size,
  initialFocusRef,
  finalFocusRef,
  children,
}) => {
  return (
    <Modal
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={size}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmit}>
            {primaryButtonLabel}
          </Button>

          <Button colorScheme="red" onClick={onClose}>
            {secondaryButtonLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
