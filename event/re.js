document.getElementById('removeButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: hideRiskModal
    });
  });
});

// Function to hide the risk modal by adding 'display: none' to its style attribute
function hideRiskModal() {
  const riskModal = document.getElementById('keywords-modal');
  
  if (riskModal) {
    riskModal.style.display = 'none';
    console.log('Risk warn reminder hidden by setting display: none');
  } else {
    console.log('Risk warn reminder not found, retrying...');
    
    setTimeout(hideRiskModal, 500); // Retry if not found
  }
}
