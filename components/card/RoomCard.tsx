import React, { useEffect, useState } from 'react';
import Card from '../../components/card';
import Image from 'next/image';
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Tooltip } from '@chakra-ui/tooltip';
import { Box } from '@chakra-ui/react';

const RoomCard = (props: {
  image: string;
  title: string;
  price: string | number;
  extra?: string;
  onViewDetails?: () => void;
  onViewDelete?: () => void;
  onViewEdit?: () => void;
}) => {
  const {
    title,
    price,
    image,
    extra,
    onViewDetails,
    onViewDelete,
    onViewEdit,
  } = props;
  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains('dark'),
  );

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <Box mb={3} h="auto" w="auto" borderRadius={7}>
            <Image
              width={300}
              height={300}
              src={image}
              alt="img"
              className="mb-3 rounded-xl"
            />
          </Box>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {title}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Current price: {price} <span>TND</span>
            </p>
          </div>
          <div className="flex items-end justify-between">
            <Tooltip label="Details" hasArrow placeContent="auto">
              <button
                onClick={onViewDetails}
                className="linear rounded-[20px] bg-horizonGreen-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-horizonGreen-500 active:bg-horizonGreen-700 dark:bg-green-400 dark:hover:bg-green-300 dark:active:opacity-90"
              >
                <AiOutlineEye />
              </button>
            </Tooltip>

            <Tooltip label="Delete" hasArrow placeContent="auto">
              <button
                onClick={onViewDelete}
                className="linear ml-3 rounded-[20px] bg-horizonRed-400 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-horizonRed-400 active:bg-horizonRed-300 dark:bg-horizonRed-400 dark:hover:bg-horizonRed-300 dark:active:opacity-90"
              >
                <AiOutlineDelete />
              </button>
            </Tooltip>

            <Tooltip label="Edit" hasArrow placeContent="auto">
              <button
                onClick={onViewEdit}
                className="linear ml-3 rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
              >
                <AiOutlineEdit />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;
