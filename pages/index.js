import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push('/chats');
      else router.push('/login');
    });
  }, []);
  return <p>Loading...</p>;
}
