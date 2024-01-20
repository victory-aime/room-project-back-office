import ModalComponent from '../../components/modal';
import React, { useState } from 'react';
import ErrorModalComponent from '../../components/modal/errorModal';
import SuccessModalComponent from '../../components/modal/successModal';
import { useRouter } from 'next/navigation';
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  isClosed: () => void;
  id: string;
}

const DetailsRoom = ({ isOpen, isClosed, id }: Props) => {
  const [message, setMessage] = useState([]);
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [roomData, setRoomData] = useState({
    roomNumber: 0,
    costPerNight: 0,
    roomType: 'SUITE',
    status: 'AVAILABLE',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsErrorModalOpen(false);
  };

  // Fonction pour gérer la soumission du formulaire
  const onSubmit = async ({ id }: Props) => {
    const data = {
      roomNumber: roomData.roomNumber,
      roomType: roomData.roomType,
      costPerNight: roomData.costPerNight,
      status: roomData.status,
      description: roomData.description,
    };

    try {
      const response = await fetch(`/api/edit-room/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const successData = await response.json();
        setTimeout(() => {
          setMessage(successData.data);
        }, 10);
      } else {
        const errorData = await response.json();
        setTimeout(() => {
          setIsErrorModalOpen(true);
          setErrorMessage(errorData.error);
        }, 10);
      }
    } catch (error) {
      console.error('Error adding room:', error.message);
      setIsErrorModalOpen(true);
    }
  };
  return (
    <>
      <ModalComponent
        title="Your Modal Title"
        primaryButtonLabel="Save"
        secondaryButtonLabel="Cancel"
        isOpen={isOpen}
        onClose={isClosed}
        size="5xl"
        onSubmit={onSubmit}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem colSpan={1}>
            <FormControl>
              <Box
                width="30vw"
                height="15vw"
                borderRadius={7}
                boxShadow="lg"
                bgColor="white"
                position="relative"
              >
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    value={roomData.description}
                    onChange={(e) =>
                      setRoomData({
                        ...roomData,
                        description: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Box>
            </FormControl>
          </GridItem>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Room Number</FormLabel>
                <Input
                  type="number"
                  name="roomNumber"
                  value={roomData.roomNumber}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      roomNumber: parseInt(e.target.value, 10),
                    })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Room Type</FormLabel>
                <Select
                  name="roomType"
                  value={roomData.roomType}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      roomType: e.target.value,
                    })
                  }
                >
                  <option value="SINGLE">single</option>
                  <option value="DOUBLE">double</option>
                  <option value="SUITE">suite</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Cost Per Night</FormLabel>
                <Input
                  type="number"
                  name="costPerNight"
                  value={roomData.costPerNight}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      costPerNight: parseFloat(e.target.value),
                    })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={roomData.status}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="AVAILABLE">available</option>
                  <option value="PENDING">pending</option>
                  <option value="OCCUPIED">occupied</option>
                  <option value="UNDER_MAINTENANCE">maintenance</option>
                </Select>
              </FormControl>
            </GridItem>
          </Grid>
        </Grid>
      </ModalComponent>

      {isSuccessModalOpen && (
        <SuccessModalComponent
          isOpen={true}
          onClose={closeModal}
          title="Success"
          description={successMessage}
        />
      )}

      {/* Modal d'erreur */}
      {isErrorModalOpen && (
        <ErrorModalComponent
          isOpen={true}
          onClose={closeModal}
          title="Error"
          description={errorMessage}
        />
      )}
    </>
  );
};

export default DetailsRoom;
