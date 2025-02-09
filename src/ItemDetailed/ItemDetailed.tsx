import { useEffect, useState } from 'react';
import ObjectCard from '../components/ObjectCard/ObjectCard';
import { useParams } from 'react-router';

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
        const response = await fetch(
          `https://stapi.co/api/v2/rest/astronomicalObject?uid=${itemId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        if (data) {
          setItemData(data.astronomicalObject);
        }
      } catch (error) {
        console.error('Error fetching astronomical object:', error);
      }
    };

    getFullInfo();
  }, [itemId]);
  return <ObjectCard data={itemData} />;
};

export default ItemDetailed;
