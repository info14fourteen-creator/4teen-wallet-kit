import { initFourteenConnect } from '../../src/index.js';

const buttonTarget = document.getElementById('wallet-button');

initFourteenConnect({
  projectId: 'YOUR_REOWN_PROJECT_ID',
  buttonTarget
});
