import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useStorageContext } from '../../modules/StorageContext';

type Props = {
  className?: string;
};

const Component = ({ className }: Props) => {
  const { state, updateUserData } = useStorageContext();
  const [source, setSource] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setSource(JSON.stringify(state.userData, null, 2));
  }, [state.userData]);

  return (
    <div className={className}>
      <textarea
        defaultValue={source}
        onBlur={(e) => {
          try {
            const userData = JSON.parse(e.target.value);
            setError('');
            updateUserData(userData);
          } catch (error) {
            setError(error.message);
          }
        }}
      ></textarea>
      <div className="error">{error ? error : ''}</div>
    </div>
  );
};

export const UserDataJsonEditor = styled(Component)`
  display: grid;
  grid-template-rows: min(400px) 50px;
  textarea {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .error {
    color: tomato;
  }
`;
