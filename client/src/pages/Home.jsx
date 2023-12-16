import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_URLS } from '../components/ShorteningForm';
import ShorteningForm from '../components/ShorteningForm';
import RecentURLsList from '../components/RecentURLsList';

function Home() {
  const { data: urlsData, refetch } = useQuery(GET_USER_URLS, {
    variables: { userId: localStorage.getItem('userId') },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <ShorteningForm onShorten={refetch} />
      {urlsData && <RecentURLsList urls={urlsData.getUserUrls.slice(0, 3)} />}
    </div>
  );
}

export default Home;