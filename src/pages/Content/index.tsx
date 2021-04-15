import { EVENT_TYPES } from '../../constants';
import React from 'react';
import ReactDom from 'react-dom';
import { App } from './components/App';
import { StorageContextProvider } from '../modules/StorageContext';
import { PasteDialog } from './components/PasteDialog';

const containerId = 'yomiyasuin-container';

const editorSelector = '[g_editable="true"]';

export type PasteTarget = HTMLElement | Element | null;

let pasteTarget: PasteTarget;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case EVENT_TYPES.POPUP_CLICKED:
      render();
      break;
    case EVENT_TYPES.PASTE_HTML:
      renderPasteDialog();
      break;
  }
});

const handleTargetClicked = (e: MouseEvent) => {
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
};

document.body.addEventListener('contextmenu', handleTargetClicked, false);

function unmount($container: Element) {
  ReactDom.unmountComponentAtNode($container);
  document.body.removeChild($container);
}

function renderPasteDialog() {
  if (!pasteTarget) {
    alert('Please click editable area to paste.');
    return;
  }
  const $container = document.createElement('div');
  $container.setAttribute('id', 'yomiyasuin-paste-dialog');
  document.body.appendChild($container);

  ReactDom.render(
    <PasteDialog
      pasteTarget={pasteTarget}
      handleClose={() => {
        unmount($container);
      }}
    />,
    $container
  );
}

function render() {
  const $container =
    document.querySelector(`#${containerId}`) || document.createElement('div');

  if ($container.getAttribute('id') === containerId) {
    unmount($container);
    return;
  }
  
  $container.setAttribute('id', containerId);
  document.body.appendChild($container);
  ReactDom.render(
    <StorageContextProvider>
      <App handleClose={() => unmount($container)} />
    </StorageContextProvider>,
    $container
  );
}
