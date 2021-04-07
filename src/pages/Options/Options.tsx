import React from 'react';
import { UserDataEditor } from './components/UserDataEditor';
import styled from '@emotion/styled';
import { StorageContextProvider } from '../modules/StorageContext';
import './index.css';

const Component: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <StorageContextProvider>
      <div className={className}>
        <h1>YOMIYASUIN</h1>
        <UserDataEditor />
      </div>
    </StorageContextProvider>
  );
};

export default styled(Component)`
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  h1 {
    margin-top: 0;
  }
  hr {
    margin-top: 16px;
    border-color: #fefefe;
    border-bottom: none;
  }
`;
