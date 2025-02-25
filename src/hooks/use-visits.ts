import { useState, useEffect } from 'react';
import { getvisitRequest } from '@/requests/getvisitsRequest';

interface VisitData {
    [visitType: string]: {
      scheduled_datetime: string;
      gmeet_link: string;
    };
  }

const useVisitData = (username: string): VisitData | null => {
    const [visitData, setVisitData] = useState<VisitData | null>(null);
    useEffect(() => {
        const fetchVisitData = async () => {
          const response = await getvisitRequest(username);
    
          // Check if response is valid
          if (response && Array.isArray(response)) {
            const data: VisitData = {};
            response.forEach((item) => {
              if (!data[item?.visit_type]) {
                data[item.visit_type] = {
                  scheduled_datetime: item?.scheduled_datetime,
                  gmeet_link: item?.gmeet_link,
                };
              }
            });
    
            setVisitData(data);
          }
        };
    
        fetchVisitData();
      }, [username]); // Depend on username to refetch data when it changes
    
      return visitData;
}

export default useVisitData;