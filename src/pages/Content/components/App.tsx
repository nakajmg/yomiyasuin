import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Preview } from './Preview';
import { SourceEditor } from './SourceEditor';
import { useStorageContext } from '../../modules/StorageContext';
type Props = {
  className?: string;
};

const Component = ({ className }: Props) => {
  const [src, setSrc] = useState(``);
  const { updateUserData } = useStorageContext();
  useEffect(() => {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.userData) {
        updateUserData(changes.userData.newValue);
      }
    });
  }, []);
  return (
    <div className={className}>
      <div className="container">
        <SourceEditor src={src} handleOnChange={setSrc} />
        <Preview src={src} />
      </div>
    </div>
  );
};

export const App = styled(Component)`
  position: fixed;
  z-index: 1000000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  .container {
    display: grid;
    grid-template-columns: 50% 1fr;
    grid-template-rows: max(100%);
    grid-gap: 16px;
    max-height: 100%;
    overflow: hidden;
  }
`;
