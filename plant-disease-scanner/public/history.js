document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    
    // Fetch prediction history from the server
    function fetchHistory() {
        fetch('/api/history')
            .then(response => response.json())
            .then(predictions => {
                if (predictions.length === 0) {
                    historyList.innerHTML = '<div class="no-history">No prediction history found.</div>';
                    return;
                }
                
                // Clear the loading message
                historyList.innerHTML = '';
                
                // Display each prediction
                predictions.forEach(prediction => {
                    const predictionElement = document.createElement('div');
                    predictionElement.className = 'history-item';
                    
                    // Format the disease name
                    let displayName = prediction.diseaseName.replace(/___/g, ' - ');
                    displayName = displayName.replace(/_/g, ' ');
                    displayName = displayName.replace(/\w\S*/g, (txt) => {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                    
                    // Format the date
                    const date = new Date(prediction.timestamp);
                    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                    
                    // Format confidence
                    const confidencePercent = (prediction.confidence * 100).toFixed(2);
                    
                    predictionElement.innerHTML = `
                        <div class="history-item-header">
                            <h3>${displayName}</h3>
                            <span class="confidence-badge">${confidencePercent}%</span>
                        </div>
                        <div class="history-item-details">
                            <p class="timestamp">Analyzed on: ${formattedDate}</p>
                        </div>
                    `;
                    
                    historyList.appendChild(predictionElement);
                });
            })
            .catch(error => {
                console.error('Error fetching history:', error);
                historyList.innerHTML = '<div class="error">Failed to load prediction history.</div>';
            });
    }
    
    // Clear history function
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all prediction history? This action cannot be undone.')) {
                fetch('/api/history', {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Refresh the history list
                        fetchHistory();
                        alert('Prediction history cleared successfully!');
                    } else {
                        alert('Failed to clear prediction history.');
                    }
                })
                .catch(error => {
                    console.error('Error clearing history:', error);
                    alert('Failed to clear prediction history.');
                });
            }
        });
    }
    
    // Initial fetch
    fetchHistory();
});