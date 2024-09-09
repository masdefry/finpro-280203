'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { rehydrate } from './slices/authSlices';  

const RehydrateWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrate());  
  }, [dispatch]);

  return <>{children}</>;  
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <RehydrateWrapper>{children}</RehydrateWrapper>
    </Provider>
  );
}
