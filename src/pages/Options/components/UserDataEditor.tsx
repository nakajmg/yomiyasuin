import React from 'react';
import styled from '@emotion/styled';
import { UserDataJsonEditor } from './UserDataJsonEditor';
import { useStorageContext } from '../../modules/StorageContext';

type Props = {
  className?: string;
};

const Component = ({ className }: Props) => {
  const { state, addUser, removeUser, updateUser } = useStorageContext();

  return (
    <div className={className}>
      <h2>User Data</h2>
      <div className="grids">
        <section>
          {state.userData.length ? (
            <div className="item">
              <span>name</span>
              <span>id</span>
            </div>
          ) : (
            <div>no data</div>
          )}

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
          <div className="buttons">
            <button className="addButton" onClick={addUser} aria-label="add">
              ➕
            </button>
          </div>
        </section>
        <section>
          <UserDataJsonEditor />
        </section>
      </div>
    </div>
  );
};

export const UserDataEditor = styled(Component)`
  margin: 0 auto;
  .grids {
    display: grid;
    grid-template-columns: min(500px) 1fr;
    grid-gap: 16px;
  }
  .item {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 200px 1fr auto;
    label {
      input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
      }
    }
  }
  .item + .item {
    margin-top: 5px;
  }
  .buttons {
    text-align: center;
  }
  .removeButton {
    height: 100%;
    box-sizing: border-box;
    padding: 2px;
    border: none;
    background: none;
  }
  .addButton {
    height: 100%;
    box-sizing: border-box;
    padding: 2px;
    border: none;
    background: none;
    font-size: 16px;
    margin-top: 5px;
  }
`;
