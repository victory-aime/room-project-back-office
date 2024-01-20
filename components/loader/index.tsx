import React, { useState, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

interface LoaderProps {
  loadingText?: string;
  successContent?: React.ReactNode;
  fetchData?: () => Promise<void>;
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  loadingText,
  successContent,
  fetchData,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchData();
        setIsLoading(false);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, [fetchData]);

  return (
    <div>
      {isLoading ? (
        <div>
          <p>{loadingText || 'Chargement en cours...'}</p>
          <ScaleLoader color="#36D7B7" loading={isLoading} />
        </div>
      ) : (
        <div>{successContent || <p>Contenu chargé avec succès !</p>}</div>
      )}
    </div>
  );
};

export default Loader;
