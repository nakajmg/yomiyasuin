import React from 'react';
import { UserDataEditor } from './components/UserDataEditor';
import styled from '@emotion/styled';
import { StorageContextProvider } from '../modules/StorageContext';

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
  padding: 0 16px 16px 16px;
  hr {
    margin-top: 16px;
    border-color: #fefefe;
    border-bottom: none;
  }
`;
