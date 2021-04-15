import React, { useState } from 'react';
import styled from '@emotion/styled';
import { convert } from '../../modules/convert';
import { useStorageContext } from '../../modules/StorageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

type Props = {
  className?: string;
  src: string;
};

const Component = ({ className, src }: Props) => {
  const { state } = useStorageContext();
  const [isOutputVisible, setIsOutputVisible] = useState(false);

  const showOutput = () => {
    setIsOutputVisible(true);
  };
  const hideOutput = () => {
    setIsOutputVisible(false);
  };

  const handleClickOptions = () => {
    chrome.runtime.sendMessage({ type: 'openOptions' });
  };

  const __html = convert({ src, userData: state.userData });
  const selectAll = (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
    const el = e.target as HTMLTextAreaElement;
    el.setSelectionRange(0, el.textContent!.length);
  };

  return (
    <div className={className}>
      <h2>
        <button
          className={isOutputVisible ? '' : 'active'}
          onClick={hideOutput}
          aria-label="show preview"
        >
          Preview
        </button>
        <button
          className={isOutputVisible ? 'active' : ''}
          onClick={showOutput}
          aria-label="show output"
        >
          Output
        </button>
        <button
          title="open options page"
          aria-label="open options page"
          onClick={handleClickOptions}
          className="y-options-link"
        >
          <FontAwesomeIcon icon={faCog} />
        </button>
      </h2>
      <div
        className={`preview ${isOutputVisible ? 'hidden' : ''}`}
        dangerouslySetInnerHTML={{
          __html,
        }}
      ></div>
      <textarea
        className={`output ${isOutputVisible ? '' : 'hidden'}`}
        onClick={selectAll}
        readOnly
        defaultValue={__html}
      ></textarea>
    </div>
  );
};

export const Preview = styled(Component)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 8px;
  border-radius: 3px;
  h2 {
    font-size: 14px !important;
    margin-top: 0;
    margin-bottom: 4px;
    display: flex;
    button {
      color: #3498db;
      font-size: 12px !important;
      background: #f7f9fa;
      border-radius: 0;
      border: 1px solid #e3e7e8;
      padding: 4px 8px;
    }
    button + button {
      margin-left: 4px;
    }
    .active {
      color: #fff;
      background-color: #3498db;
      border-color: #efefef;
    }
  }
  .preview {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 4px solid #efefef;
    overflow: auto;
  }
  .hidden {
    display: none;
  }
  .output {
    resize: none;
    height: 100%;
    font-size: 12px;
    padding: 4px;
    box-sizing: border-box;
    background-color: #efefef;
    border: none;
  }
  .y-options-link {
    margin-left: auto;
    margin-right: 4px;
    border: none;
    background-color: transparent;
    font-size: 16px !important;
  }
`;
