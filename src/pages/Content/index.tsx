import { EVENT_TYPES } from '../../constants';
import React from 'react';
import ReactDom from 'react-dom';
import { App } from './components/App';
import { StorageContextProvider } from '../modules/StorageContext';

const containerId = 'yomiyasuin-container';

const editorSelector = '[g_editable="true"]';

let pasteTarget: HTMLElement | Element | null;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case EVENT_TYPES.POPUP_CLICKED:
      render();
      break;
    case EVENT_TYPES.PASTE_HTML:
      console.log('fire paste');
      navigator.clipboard.readText().then((clipText) => {
        pasteAsHTML(clipText);
      });
      break;
  }
});

const pasteAsHTML = (clipText: string) => {
  if (!pasteTarget) return;
  const isEditable = pasteTarget.getAttribute('contenteditable');
  if (!isEditable) return;
  pasteTarget.innerHTML += clipText;
};

document.body.addEventListener(
  'click',
  function (e) {
    // @ts-ignore
    const targetEl = e.target as HTMLElement;
    if (targetEl.matches(editorSelector)) {
      pasteTarget = targetEl;
      return;
    }
    const parentEl = targetEl.closest(editorSelector);
    if (parentEl) {
      pasteTarget = parentEl;
    }
  },
  false
);

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
