// Ensure all elements are hidden on page load using a more direct approach
window.addEventListener('load', function() {
    // Hide all elements immediately on page load
    const elementsToHide = ['loading', 'result-display', 'image-preview', 'weather-alerts-container'];
    elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
            element.classList.add('hidden');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const imageInput = document.getElementById('image-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const loadingDiv = document.getElementById('loading');
    const resultDisplay = document.getElementById('result-display');
    const imagePreview = document.getElementById('image-preview');
    const previewImage = document.getElementById('preview-image');
    const viewDocsBtn = document.getElementById('view-docs-btn');
    const modal = document.getElementById('disease-docs-modal');
    const closeModal = document.querySelector('.close');
    const modalContent = document.getElementById('disease-docs-content');
    const checkWeatherAlertsBtn = document.getElementById('check-weather-alerts');
    const weatherAlertsContainer = document.getElementById('weather-alerts-container');
    const weatherAlertsContent = document.getElementById('weather-alerts-content');
    
    let currentDisease = null;

    // Handle image preview when file is selected
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    if (previewImage) {
                        previewImage.src = e.target.result;
                        if (imagePreview) {
                            imagePreview.style.display = 'block';
                            imagePreview.classList.remove('hidden');
                        }
                    }
                }
                
                reader.readAsDataURL(this.files[0]);
            } else {
                if (imagePreview) {
                    imagePreview.style.display = 'none';
                    imagePreview.classList.add('hidden');
                }
            }
        });
    }

    // View documentation button event
    if (viewDocsBtn) {
        viewDocsBtn.addEventListener('click', () => {
            if (currentDisease) {
                fetchDiseaseInfo(currentDisease);
            }
        });
    }

    // Close modal when clicking on X
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (modal) {
                modal.classList.add('hidden');
                modal.style.display = 'none';
            }
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    });

    // Check weather alerts button event
    if (checkWeatherAlertsBtn) {
        checkWeatherAlertsBtn.addEventListener('click', () => {
            // Get user's location using Geoapify
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        
                        // Show loading state
                        weatherAlertsContent.innerHTML = '<div class="loading">Checking weather conditions...</div>';
                        weatherAlertsContainer.style.display = 'block';
                        weatherAlertsContainer.classList.remove('hidden');
                        
                        // Fetch weather alerts
                        fetch(`/api/weather-alerts?lat=${lat}&lon=${lon}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then(data => {
                                if (data.success) {
                                    displayWeatherAlerts(data.alerts);
                                } else {
                                    weatherAlertsContent.innerHTML = `<div class="error">${data.error || 'Failed to fetch weather alerts.'}</div>`;
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching weather alerts:', error);
                                weatherAlertsContent.innerHTML = '<div class="error">Failed to fetch weather alerts. Please try again later.</div>';
                            });
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                        weatherAlertsContent.innerHTML = '<div class="error">Unable to get your location. Please enable location services.</div>';
                        weatherAlertsContainer.style.display = 'block';
                        weatherAlertsContainer.classList.remove('hidden');
                    }
                );
            } else {
                weatherAlertsContent.innerHTML = '<div class="error">Geolocation is not supported by your browser.</div>';
                weatherAlertsContainer.style.display = 'block';
                weatherAlertsContainer.classList.remove('hidden');
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!imageInput || !imageInput.files.length) {
                alert('Please select an image file');
                return;
            }

            const file = imageInput.files[0];
            
            // Show loading spinner and hide results
            if (loadingDiv) {
                loadingDiv.style.display = 'flex';
                loadingDiv.classList.remove('hidden');
            }
            if (resultDisplay) {
                resultDisplay.style.display = 'none';
                resultDisplay.classList.add('hidden');
            }
            
            // Disable button during analysis
            if (analyzeBtn) {
                analyzeBtn.disabled = true;
                analyzeBtn.textContent = 'Analyzing...';
            }

            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Hide loading spinner immediately when response is received
                if (loadingDiv) {
                    loadingDiv.style.display = 'none';
                    loadingDiv.classList.add('hidden');
                }

                if (data.success) {
                    // Store the original disease name for API calls
                    currentDisease = data.disease;
                    
                    // Format the disease name to be more readable for display
                    let diseaseName = data.disease;
                    
                    // Remove underscores and capitalize words
                    diseaseName = diseaseName.replace(/___/g, ' - ');
                    diseaseName = diseaseName.replace(/_/g, ' ');
                    // Capitalize first letter of each word
                    diseaseName = diseaseName.replace(/\w\S*/g, (txt) => {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                    
                    // Update result display
                    const diseaseNameElement = resultDisplay ? resultDisplay.querySelector('.disease-name') : null;
                    const confidenceElement = resultDisplay ? resultDisplay.querySelector('.confidence') : null;
                    const confidenceLevel = resultDisplay ? resultDisplay.querySelector('.confidence-level') : null;
                    
                    if (diseaseNameElement) diseaseNameElement.textContent = diseaseName;
                    
                    if (data.confidence) {
                        const confidencePercent = (data.confidence * 100).toFixed(2);
                        if (confidenceElement) confidenceElement.textContent = `Confidence: ${confidencePercent}%`;
                        if (confidenceLevel) confidenceLevel.style.width = `${confidencePercent}%`;
                    } else {
                        if (confidenceElement) confidenceElement.textContent = 'Confidence: Unknown';
                        if (confidenceLevel) confidenceLevel.style.width = '0%';
                    }
                    
                    // Show documentation button
                    if (viewDocsBtn) {
                        viewDocsBtn.classList.remove('hidden');
                        viewDocsBtn.style.display = 'block';
                    }
                    
                    // Show results and add success class
                    if (resultDisplay) {
                        resultDisplay.style.display = 'flex';
                        resultDisplay.classList.remove('hidden');
                        resultDisplay.classList.add('result-success');
                        resultDisplay.classList.remove('result-error');
                    }
                } else {
                    // Show error message
                    const diseaseNameElement = resultDisplay ? resultDisplay.querySelector('.disease-name') : null;
                    const confidenceElement = resultDisplay ? resultDisplay.querySelector('.confidence') : null;
                    const confidenceLevel = resultDisplay ? resultDisplay.querySelector('.confidence-level') : null;
                    
                    if (diseaseNameElement) diseaseNameElement.textContent = 'Error';
                    if (confidenceElement) confidenceElement.textContent = data.error || 'Failed to analyze the image';
                    if (confidenceLevel) confidenceLevel.style.width = '0%';
                    
                    // Hide documentation button on error
                    if (viewDocsBtn) {
                        viewDocsBtn.classList.add('hidden');
                        viewDocsBtn.style.display = 'none';
                    }
                    
                    // Show results and add error class
                    if (resultDisplay) {
                        resultDisplay.style.display = 'flex';
                        resultDisplay.classList.remove('hidden');
                        resultDisplay.classList.add('result-error');
                        resultDisplay.classList.remove('result-success');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                
                // Hide loading spinner
                if (loadingDiv) {
                    loadingDiv.style.display = 'none';
                    loadingDiv.classList.add('hidden');
                }
                
                // Show error message
                const diseaseNameElement = resultDisplay ? resultDisplay.querySelector('.disease-name') : null;
                const confidenceElement = resultDisplay ? resultDisplay.querySelector('.confidence') : null;
                const confidenceLevel = resultDisplay ? resultDisplay.querySelector('.confidence-level') : null;
                
                if (diseaseNameElement) diseaseNameElement.textContent = 'Connection Error';
                if (confidenceElement) confidenceElement.textContent = 'Failed to connect to the analysis server. Please check if the AI server is running.';
                if (confidenceLevel) confidenceLevel.style.width = '0%';
                
                // Hide documentation button on error
                if (viewDocsBtn) {
                    viewDocsBtn.classList.add('hidden');
                    viewDocsBtn.style.display = 'none';
                }
                
                // Show results and add error class
                if (resultDisplay) {
                    resultDisplay.style.display = 'flex';
                    resultDisplay.classList.remove('hidden');
                    resultDisplay.classList.add('result-error');
                    resultDisplay.classList.remove('result-success');
                }
            } finally {
                // Re-enable button
                if (analyzeBtn) {
                    analyzeBtn.disabled = false;
                    analyzeBtn.textContent = 'Analyze Crop';
                }
            }
        });
    }
    
    // Function to fetch and display disease information
    async function fetchDiseaseInfo(diseaseName) {
        try {
            const response = await fetch(`/api/disease-info/${encodeURIComponent(diseaseName)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            if (response.ok) {
                displayDiseaseInfo(data);
            } else {
                console.error('Error fetching disease info:', data.error);
                alert('Failed to load disease information');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to load disease information');
        }
    }
    
    // Function to display disease information in the modal
    function displayDiseaseInfo(diseaseInfo) {
        if (!modal || !modalContent) return;
        
        // Format the disease name for display
        let displayName = diseaseInfo.diseaseName.replace(/___/g, ' - ');
        displayName = displayName.replace(/_/g, ' ');
        displayName = displayName.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        
        // Create HTML content for the modal
        let htmlContent = `
            <h2 id="modal-disease-name">${displayName}</h2>
            <p class="disease-description"><strong>Scientific Name:</strong> ${diseaseInfo.scientificName}</p>
            <p class="disease-description"><strong>Plant Type:</strong> ${diseaseInfo.plantType}</p>
            <p class="disease-description">${diseaseInfo.description}</p>
            
            <div class="disease-section">
                <h3>Symptoms</h3>
                <ul>
                    ${diseaseInfo.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                </ul>
            </div>
            
            <div class="disease-section">
                <h3>Causes</h3>
                <ul>
                    ${diseaseInfo.causes.map(cause => `<li>${cause}</li>`).join('')}
                </ul>
            </div>
            
            <div class="disease-section">
                <h3>Prevention</h3>
                <ul>
                    ${diseaseInfo.prevention.map(prevention => `<li>${prevention}</li>`).join('')}
                </ul>
            </div>
            
            <div class="disease-section">
                <h3>Treatment</h3>
                <ul>
                    ${diseaseInfo.treatment.map(treatment => `<li>${treatment}</li>`).join('')}
                </ul>
            </div>
            
            <div class="disease-section">
                <h3>Recommended Fertilizers</h3>
                <ul>
                    ${diseaseInfo.fertilizers.map(fertilizer => `<li>${fertilizer}</li>`).join('')}
                </ul>
            </div>
            
            <div class="disease-section">
                <h3>Recommended Pesticides</h3>
                <ul>
                    ${diseaseInfo.pesticides.map(pesticide => `<li>${pesticide}</li>`).join('')}
                </ul>
            </div>
            
            <div class="disease-section">
                <h3>Natural Remedies</h3>
                <ul>
                    ${diseaseInfo.naturalRemedies.map(remedy => `<li>${remedy}</li>`).join('')}
                </ul>
            </div>
            
            <div class="disease-section">
                <h3>Best Practices</h3>
                <ul>
                    ${diseaseInfo.bestPractices.map(practice => `<li>${practice}</li>`).join('')}
                </ul>
            </div>
        `;
        
        modalContent.innerHTML = htmlContent;
        
        // Show the modal
        modal.classList.remove('hidden');
        modal.style.display = 'block';
    }
    
    // Function to display weather alerts
    function displayWeatherAlerts(alerts) {
        if (!weatherAlertsContent) return;
        
        if (alerts.length === 0) {
            weatherAlertsContent.innerHTML = '<div class="no-alerts">No disease risks detected in your area for the next 3 days.</div>';
            return;
        }
        
        let htmlContent = '';
        alerts.forEach(alert => {
            const riskClass = alert.riskLevel === 'High' ? 'high-risk' : 'moderate-risk';
            htmlContent += `
                <div class="alert-item ${riskClass}">
                    <div class="alert-disease">${alert.disease}</div>
                    <div class="alert-message">${alert.message}</div>
                </div>
            `;
        });
        
        weatherAlertsContent.innerHTML = htmlContent;
    }
});