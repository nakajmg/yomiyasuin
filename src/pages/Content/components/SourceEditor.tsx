import React from 'react';
import styled from '@emotion/styled';

type Props = {
  className?: string;
  src: string;
  handleOnChange: (str: string) => void;
};

const Component = ({ className, src, handleOnChange }: Props) => {
  return (
    <div className={className}>
      <h2>Source</h2>
      <textarea
        defaultValue={src}
        onChange={(e) => handleOnChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export const SourceEditor = styled(Component)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 8px;
  border-radius: 3px;
  h2 {
    font-size: 14px !important;
    margin-top: 0;
    margin-bottom: 4px;
  }
  textarea {
    flex-grow: 1;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 400px;
    box-sizing: border-box;
    border: 1px solid #efefef;
    padding: 4px;
  }
`;
