"use client"

import { useDispatch } from 'react-redux';
import { logout } from '@/redux/actions';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return {
    handleLogout,
  };
};

export default useLogout;
