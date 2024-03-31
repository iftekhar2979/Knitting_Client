"use client"
import React, { createContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useGetUserByIdQuery } from '@/lib/features/user/userApiSlice';
import { setCredentials } from '@/lib/features/user/userSlice';

export const AuthContext = createContext(null)
const UserContext = ({ children }) => {
  const { data: userInformation, isLoading } = useGetUserByIdQuery()
  const dispatch = useDispatch()

  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    if (userInformation) {
      dispatch(setCredentials(userInformation))
      setUser(userInformation.data.name)
      setLoading(false)
    }

    // setUser(userInformation.userInfo.data.name)
    // const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   // console.log(currentUser);
    //   if (currentUser) {
    //     setLoading(false);
    //     setUser(currentUser);
    //   } else {
    //     setLoading(false);
    //   }
    //   return () => unSubscribe();
    // });
  }, [userInformation]);
  const object = {
   setUser, user, loading, isLoading
  }

  return (
    <AuthContext.Provider value={object}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;