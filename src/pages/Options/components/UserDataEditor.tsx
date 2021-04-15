import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { UserDataJsonEditor } from './UserDataJsonEditor';
import { useStorageContext } from '../../modules/StorageContext';

type Props = {
  className?: string;
};

const Component = ({ className }: Props) => {
  const {
    state,
    addUser,
    removeUser,
    updateUser,
    updateUserData,
  } = useStorageContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const download = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = e.target as HTMLAnchorElement;
    target.href = URL.createObjectURL(
      new Blob([JSON.stringify(state.userData, null, 2)], {
        type: 'application/octet-stream',
      })
    );
  };

  const handleClickLoadFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        updateUserData(json);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      } catch (err) {
        alert(err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={className}>
      <div className="grids">
        <section className="y-userData">
          <div className="y-userData-header">
            {state.userData.length ? (
              <div className="item">
                <span>name</span>
                <span>id</span>
              </div>
            ) : (
              <div>no data</div>
            )}
          </div>
          <div className="y-userData-list">
            {state.userData.map(({ name, id }, index) => {
              return (
                <div key={`${id}_${name}`} className="item">
                  <label aria-label="name">
                    <input
                      type="text"
                      defaultValue={name}
                      className="name"
                      onBlur={(e) =>
                        updateUser(index, { id, name: e.target.value })
                      }
                      placeholder="name"
                    />
                  </label>
                  <label aria-label="id">
                    <input
                      type="text"
                      defaultValue={id}
                      className="id"
                      onBlur={(e) =>
                        updateUser(index, { id: e.target.value, name })
                      }
                      placeholder="id"
                    />
                  </label>
                  <div>
                    <button
                      className="removeButton"
                      onClick={() => removeUser(index)}
                      aria-label="remove"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="buttons">
            <button className="addButton" onClick={addUser} aria-label="add">
              ➕
            </button>
          </div>
        </section>
        <section>
          <UserDataJsonEditor />
        </section>
        <section className="controls">
          <button className="actionButton" onClick={handleClickLoadFile}>
            Load from file
            <input
              ref={inputRef}
              type="file"
              onChange={onSelectFile}
              accept=".json,.txt"
              style={{ display: 'none' }}
            />
          </button>
          <a
            onClick={download}
            download="yomiyasuin.json"
            href="#"
            className="actionButton"
          >
            Download
          </a>
        </section>
      </div>
    </div>
  );
};

export const UserDataEditor = styled(Component)`
  margin: auto;
  width: 100%;
  max-width: 1200px;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
  .grids {
    display: grid;
    grid-template-columns: min(40%) 1fr;
    grid-template-rows: 1fr 40px;
    grid-gap: 8px 16px;
    height: 100%;
    box-sizing: border-box;
  }
  .item {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 200px 1fr auto;
    padding: 2px 8px 2px 2px;
    label {
      input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        background-color: transparent;
        border: none;
      }
    }
  }

  .item:nth-of-type(2n) {
    background-color: #eaeaea;
  }
  .item:hover {
    background-color: #3498db;
    input {
      color: #fff;
    }
  }

  .y-userData {
    display: grid;
    grid-template-rows: auto auto 1fr;
    overflow: hidden;
  }
  .y-userData-list {
    overflow: auto;
    margin: 8px 0;
    padding: 12px 0;
    border-top: 1px solid rgb(180, 180, 180);
    border-bottom: 1px solid rgb(180, 180, 180);
  }

  .item + .item {
    margin-top: 5px;
  }

  .buttons {
    text-align: center;
    align-self: start;
  }
  .removeButton {
    height: 100%;
    box-sizing: border-box;
    padding: 2px;
    border: none;
    background: none;
    opacity: 0.4;
    cursor: pointer;
    &:focus,
    &:hover {
      opacity: 1;
    }
  }
  .addButton {
    height: 100%;
    box-sizing: border-box;
    border: none;
    background: none;
    font-size: 16px;
  }
  .controls {
    width: 100%;
    grid-column: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .actionButton {
    font-weight: normal;
    font-size: 14px;
    border-radius: 0;
    padding: 8px;
    color: #fff;
    background-color: #3498db;
    border: 1px solid #efefef;
    text-decoration: none;
    cursor: pointer;
  }
  .actionButton + .actionButton {
    margin-left: 16px;
  }
`;
