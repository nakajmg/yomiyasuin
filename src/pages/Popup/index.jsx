import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type:"test"});
});

//render(<Popup />, window.document.querySelector('#app-container'));
//
//if (module.hot) module.hot.accept();
