'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Banner from '../../../components/admin/nft-marketplace/Banner';
import RoomCard from '../../../components/card/RoomCard';

// Import des images
import NFt2 from '/public/bedroom.jpg';
import AddRoom from '../../form/AddRoom';
import { MoonLoader } from 'react-spinners';
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
} from '@chakra-ui/react';
import ErrorModalComponent from '../../../components/modal/errorModal';
import ModalComponent from '../../../components/modal';
import SuccessModalComponent from '../../../components/modal/successModal';
import { useRouter } from 'next/navigation';

// Définition du composant Marketplace
const Marketplace = () => {
  // Déclaration des états
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalDetailsOpen(false);
    setIsModalDeleteOpen(false);
    window.location.reload();
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await fetch(`/api/get-room-id/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const successData = await response.json();
        setTimeout(() => {
          setIsModalDetailsOpen(true);
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
    console.log(`View details for room with ID: ${id}`);
  };

  const deleteRoom = async (id) => {
    try {
      const response = await fetch(`/api/delete-room/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const successData = await response.json();
        setTimeout(() => {
          setIsSuccessModalOpen(true);
          setSuccessMessage(successData.data);
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
    console.log(`delete room with ID: ${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchRooms = async () => {
      try {
        const response = await fetch(`/api/get-room`, { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setRooms(data.data);
        } else {
          console.error('Error fetching rooms:', response.statusText);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    fetchRooms();
  }, []);

  return (
    <>
      {isLoading && (
        <Center minHeight="100vh">
          <MoonLoader size={50} color="blue" />
        </Center>
      )}
      {/* Contenu principal du composant */}
      <div className="mt-3 h-full gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          {/* Room Banner */}
          <Banner />

          {/* Room Header */}
          <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
            <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
              Manage Rooms
            </h4>
            <div className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
              <button
                onClick={openModal}
                className="linear flex items-center rounded-xl bg-blue-400 px-4 py-2 text-center text-base font-medium text-white transition duration-200 hover:!bg-blue-400/80 active:!bg-blue-400/70"
              >
                <AiOutlinePlus className="mr-2" />
                Add a room
              </button>
              {isModalOpen && (
                <AddRoom isOpen={openModal} isClosed={closeModal} />
              )}
            </div>
          </div>

          {/*Room card*/}

          <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard
                key={room?.id}
                title={room?.roomType}
                price={room?.costPerNight}
                image={NFt2}
                onViewDetails={() => {
                  handleViewDetails(room?.id);
                }}
                onViewDelete={() => deleteRoom(room?.id)}
                onViewEdit={() =>
                  router.push(`/admin/manage-rooms/edit/${room?.id}`)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {isModalDetailsOpen && (
        <ModalComponent
          title="Your Modal Title"
          primaryButtonLabel="Save"
          secondaryButtonLabel="Cancel"
          isOpen={isModalDetailsOpen}
          onClose={() => setIsModalDetailsOpen(false)}
          size="5xl"
        >
          <div>
            <p>Room Number: {message.roomNumber}</p>
            <p>Room Type: {message.roomType}</p>
            <p>Cost Per Night: {message.costPerNight}</p>
            <p>Status: {message.status}</p>
            <p>Description: {message.description}</p>
          </div>
        </ModalComponent>
      )}

      {isSuccessModalOpen && (
        <SuccessModalComponent
          isOpen={true}
          onClose={closeModal}
          title="Success"
          description={successMessage}
        />
      )}

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

export default Marketplace;
