// import { sample } from 'lodash';
// import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export const users = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [bots, setBots] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('http://localhost:4000/s/api/bots');
        if (!response.ok) throw new Error('Failed to fetch bots');
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.error(error);
        setBots([]); // Set to empty array or handle error appropriately
      }
    };

    fetchBots();
  }, []);

  return bots;
};
/* ------------------------------  
import { useState, useEffect } from 'react';

export const useBots = () => {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('http://localhost:4000/s/api/bots');
        if (!response.ok) throw new Error('Failed to fetch bots');
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.error(error);
        setBots([]); // Set to empty array or handle error appropriately
      }
    };

    fetchBots();
  }, []);

  return bots;
};
*/