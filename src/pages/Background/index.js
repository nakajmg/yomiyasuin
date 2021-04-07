import { EVENT_TYPES } from '../../constants';

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: EVENT_TYPES.POPUP_CLICKED });
  });
});
