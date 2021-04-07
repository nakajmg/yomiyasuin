import React, {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { UserData } from '../types';
import { loadStorage, saveStorage, STORAGE_KEYS } from './storage';

type StorageState = {
  userData: UserData[];
};

const actionTypes = {
  REPLACE: 'REPLACE',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  REMOVE_USER: 'REMOVE_USER',
  UPDATE_USERDATA: 'UPDATE_USERDATA',
} as const;

interface StorageAction {
  type: keyof typeof actionTypes;
  payload?: StorageState;
}

const initialState: StorageState = {
  userData: [],
};

const StorageContext = createContext<{
  state: StorageState;
  addUser: () => void;
  updateUser: (index: number, userData: UserData) => void;
  removeUser: (index: number) => void;
  updateUserData: (userData: UserData[]) => void;
}>({
  state: initialState,
  addUser: () => {},
  updateUser: () => {},
  removeUser: () => {},
  updateUserData: () => {},
});

export const useStorageContext = () => useContext(StorageContext);

export const StorageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const reducer: Reducer<StorageState, StorageAction> = (state, action) => {
    switch (action.type) {
      case actionTypes.REPLACE:
        return action.payload!;
      case actionTypes.ADD_USER:
        return {
          ...state,
          userData: [...state.userData, { id: '', name: '' }],
        };
      case actionTypes.REMOVE_USER:
        saveStorage({
          ...state,
          ...action.payload,
        });
        return {
          ...state,
          ...action.payload,
        };
      case actionTypes.UPDATE_USER:
        saveStorage({
          ...state,
          ...action.payload,
        });
        return {
          ...state,
          ...action.payload,
        };
      case actionTypes.UPDATE_USERDATA:
        saveStorage({
          ...state,
          ...action.payload,
        });
        return {
          ...state,
          ...action.payload,
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const load = async () => {
      const storageData = await loadStorage(STORAGE_KEYS);
      dispatch({ type: actionTypes.REPLACE, payload: storageData });
    };
    load();
  }, []);

  const addUser = () => {
    dispatch({ type: actionTypes.ADD_USER });
  };
  const updateUser = (index: number, { name, id }: UserData) => {
    const userData = [...state.userData];
    userData.splice(index, 1, { id, name });
    dispatch({ type: actionTypes.UPDATE_USER, payload: { userData } });
  };
  const removeUser = (index: number) => {
    const userData = [...state.userData];
    userData.splice(index, 1);
    dispatch({ type: actionTypes.REMOVE_USER, payload: { userData } });
  };

  const updateUserData = (userData: UserData[]) => {
    dispatch({ type: actionTypes.UPDATE_USERDATA, payload: { userData } });
  };

  return (
    <StorageContext.Provider
      value={{ state, addUser, updateUser, removeUser, updateUserData }}
    >
      {children}
    </StorageContext.Provider>
  );
};
