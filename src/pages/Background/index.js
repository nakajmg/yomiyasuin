import { EVENT_TYPES } from '../../constants';

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: EVENT_TYPES.POPUP_CLICKED });
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'pasteHtml',
    title: 'Paste as HTML',
    type: 'normal',
    contexts: ['editable'],
  });
});

chrome.contextMenus.onClicked.addListener((item) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: EVENT_TYPES.PASTE_HTML });
  });
});
