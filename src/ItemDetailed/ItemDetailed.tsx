import { useEffect, useState } from 'react';
import ObjectCard from '../components/ObjectCard/ObjectCard';
import { useParams } from 'react-router';
import Spinner from '../components/Spinner/Spinner';

interface ApiResponce {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location: {
    uid: string;
    name: string;
    astronomicalObjectType: string;
    location: {
      uid: string;
      name: string;
    };
  };
}

const ItemDetailed = () => {
  const { id } = useParams();

  const itemId = id?.split('=')[1] || undefined;
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [itemData, setItemData] = useState<ApiResponce>({
    uid: 'string',
    name: 'string',
    astronomicalObjectType: 'string',
    location: {
      uid: 'string',
      name: 'string',
      astronomicalObjectType: 'string',
      location: {
        uid: 'string',
        name: 'string',
      },
    },
  });
  useEffect(() => {
    if (!itemId) return;

    const getFullInfo = async () => {
      try {
        setisLoading(true);
        setError(null);
        const response = await fetch(
          `https://stapi.co/api/v2/rest/astronomicalObject?uid=${itemId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        if (data) {
          setisLoading(false);
          setItemData(data.astronomicalObject);
        }
      } catch (error) {
        setError(error as Error);
        console.error('Error fetching astronomical object:', error);
      }
    };

    getFullInfo();
  }, [itemId]);
  return (
    <Spinner isLoading={isLoading} error={error?.message || null}>
      <ObjectCard data={itemData} />
    </Spinner>
  );
};

export default ItemDetailed;
