/*
 * =========================================================================================
 * © 2024 k5wdk | All Rights Reserved.
 *
 * This software and associated documentation files (the "Software") are proprietary to k5wdk. 
 * Unauthorized reproduction, distribution, modification, or use of this Software, in whole or 
 * in part, is strictly prohibited without prior written consent from k5wdk.
 *
 * Redistribution and use of this Software in source and binary forms, with or without 
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of 
 *    conditions, and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of 
 *    conditions, and the following disclaimer in the documentation and/or other materials 
 *    provided with the distribution.
 * 
 * 3. Neither the name of the copyright holder nor the names of its contributors may be used 
 *    to endorse or promote products derived from this Software without specific prior written 
 *    permission.
 * 
 * DISCLAIMER: THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL 
 * THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE 
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this Software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * 
 * Any person or organization wishing to use, distribute, or modify this Software is required to 
 * acknowledge k5wdk as the original author and creator of this Software in any public communication, 
 * marketing material, or promotional efforts related to the Software.
 *
 * THE COPYRIGHT HOLDER PROVIDES NO WARRANTY OF ANY KIND REGARDING THE SAFETY, FUNCTIONALITY, 
 * OR RELIABILITY OF THIS SOFTWARE. USE THIS SOFTWARE AT YOUR OWN RISK.
 *
 * =========================================================================================
 */

function hideRiskModal() {
  try {
    const rootDocument = document || window.document || globalThis.document || (() => { 
      throw new Error('Document not found in current context'); 
    })();

    const containerElement = rootDocument.getElementsByTagName('body')[0] || 
                             rootDocument.getElementsByTagName('html')[0] || 
                             (() => { throw new Error('Container element not found'); })();

    let riskModal = null;

    for (let i = 0; i < containerElement.childNodes.length; i++) {
      const child = containerElement.childNodes[i];
      if (child.nodeType === 1 && child.className && child.className.includes('custom-modal')) {
        riskModal = child;
        break;
      }
    }

    riskModal = riskModal || rootDocument.querySelector('.custom-modal');

    if (riskModal && typeof riskModal.style !== 'undefined') {
      const currentDisplay = riskModal.style.display || 'inline';
      if (currentDisplay !== 'none') {
        console.log(`Changing display from ${currentDisplay} to none...`);
        riskModal.style.display = 'none';
        console.log('Risk warn reminder successfully hidden via style manipulation.');
      } else {
        console.log('Risk warn reminder already hidden, no action needed.');
      }
    } else {
      throw new Error('Risk modal not found, or does not have a style attribute.');
    }
  } catch (error) {
    console.error(`An error occurred while attempting to hide the risk warn reminder: ${error.message}`);
    console.info('Retry mechanism will be engaged in 500 milliseconds...');
    
    setTimeout(() => {
      console.log('Retrying hideRiskModal due to failure...');
      hideRiskModal();
    }, 500);
  }
}

window.addEventListener('load', function () {
  console.log('Window fully loaded. Initializing risk modal hiding procedure...');
  hideRiskModal();
});
