"use client"
import React, { createContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useGetUserByIdQuery } from '@/lib/features/user/userApiSlice';
import { setCredentials } from '@/lib/features/user/userSlice';

export const AuthContext = createContext(null)
const UserContext = ({ children }) => {
  const { data: userInformation, isLoading: isFetchingUser } = useGetUserByIdQuery()
  const dispatch = useDispatch()

  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isFetchingUser) {
      setLoading(true)
    } else {
      if (userInformation) {
        dispatch(setCredentials(userInformation))
        setUser(userInformation.data.name)
      }
      setLoading(false)
    }
  }, [userInformation, isFetchingUser, dispatch]);

  const object = {
   setUser, user, loading, isLoading: isFetchingUser
  }

  return (
    <AuthContext.Provider value={object}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;