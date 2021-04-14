import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { PasteTarget } from '../index';

type Props = {
  className?: string;
  pasteTarget?: PasteTarget;
  handleClose: () => void;
};

const Component = ({ className, pasteTarget, handleClose }: Props) => {
  const [htmlString, setHtmlString] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const pasteAsInnerHTML = () => {
    if (pasteTarget) {
      pasteTarget.innerHTML += htmlString;
    }
    handleClose();
  };

  useEffect(() => {
    dialogRef.current?.show();
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  }, []);

  return (
    <div className={className}>
      <dialog ref={dialogRef} className="yomiyasuin-dialog">
        <textarea
          ref={textareaRef}
          defaultValue={htmlString}
          onBlur={(e) => setHtmlString(e.target.value)}
        ></textarea>
        <div className="yomiyasuin-dialog-buttons">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={pasteAsInnerHTML}>Paste</button>
        </div>
      </dialog>
    </div>
  );
};

export const PasteDialog = styled(Component)`
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .yomiyasuin-dialog {
    position: absolute;
    top: 0;
    bottom: 0;
    border: none;
    width: 400px;
    height: 300px;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-gap: 16px;
    textarea {
      width: 100%;
      box-sizing: border-box;
    }
    .yomiyasuin-dialog-buttons {
      display: flex;
      align-items: center;
      justify-content: right;
      button:first-of-type {
        margin-left: auto;
        margin-right: 8px;
      }
    }
  }
`;
