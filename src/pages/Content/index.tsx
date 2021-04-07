import { EVENT_TYPES } from '../../constants';
import React from 'react';
import ReactDom from 'react-dom';
import { App } from './components/App';
import { StorageContextProvider } from '../modules/StorageContext';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case EVENT_TYPES.POPUP_CLICKED:
      render();
      break;
  }
});

const containerId = 'yomiyasuin-container';

function render() {
  const $container =
    document.querySelector(`#${containerId}`) || document.createElement('div');
  if ($container.getAttribute('id') === containerId) {
    ReactDom.unmountComponentAtNode($container);
    $container.removeAttribute('id');
    return;
  }
  $container.setAttribute('id', containerId);
  document.body.appendChild($container);
  ReactDom.render(
    <StorageContextProvider>
      <App />
    </StorageContextProvider>,
    $container
  );
}
