/**
 * Main Application Logic
 * Handles UI interactions and coordinates between modules
 */

// DOM Elements
const elements = {
    // API Key Modal
    apiKeyModal: document.getElementById('apiKeyModal'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    saveApiKeyBtn: document.getElementById('saveApiKeyBtn'),

    // Upload Section
    uploadArea: document.getElementById('uploadArea'),
    fileInput: document.getElementById('fileInput'),
    uploadBtn: document.getElementById('uploadBtn'),

    // Preview Section
    previewSection: document.getElementById('previewSection'),
    previewImage: document.getElementById('previewImage'),
    removeImage: document.getElementById('removeImage'),
    analyzeBtn: document.getElementById('analyzeBtn'),

    // Loading Section
    loadingSection: document.getElementById('loadingSection'),

    // Error Section
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    retryBtn: document.getElementById('retryBtn'),

    // Results Section
    resultsSection: document.getElementById('resultsSection'),
    totalCalories: document.getElementById('totalCalories'),
    foodList: document.getElementById('foodList'),
    saveToHistoryBtn: document.getElementById('saveToHistoryBtn'),
    newAnalysisBtn: document.getElementById('newAnalysisBtn'),

    // History Sidebar
    historySidebar: document.getElementById('historySidebar'),
    historyList: document.getElementById('historyList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    todayCalories: document.getElementById('todayCalories'),
    weekCalories: document.getElementById('weekCalories')
};

// State
let currentImage = null;
let currentAnalysisResult = null;
let apiKey = null;

/**
 * Initialize the application
 */
function init() {
    // Check for saved API key
    apiKey = getApiKey();

    if (!apiKey) {
        showApiKeyModal();
    }

    // Setup event listeners
    setupEventListeners();

    // Load and display history
    loadHistory();

    console.log('EatWhat app initialized');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // API Key Modal
    elements.saveApiKeyBtn.addEventListener('click', handleSaveApiKey);
    elements.apiKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSaveApiKey();
        }
    });

    // Upload Area
    elements.uploadBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡，避免触发 uploadArea 的点击事件
        elements.fileInput.click();
    });

    elements.uploadArea.addEventListener('click', () => {
        elements.fileInput.click();
    });

    elements.fileInput.addEventListener('change', handleFileSelect);

    // Drag and Drop
    elements.uploadArea.addEventListener('dragover', handleDragOver);
    elements.uploadArea.addEventListener('dragleave', handleDragLeave);
    elements.uploadArea.addEventListener('drop', handleDrop);

    // Preview Section
    elements.removeImage.addEventListener('click', handleRemoveImage);
    elements.analyzeBtn.addEventListener('click', handleAnalyze);

    // Error Section
    elements.retryBtn.addEventListener('click', handleRetry);

    // Results Section
    elements.saveToHistoryBtn.addEventListener('click', handleSaveToHistory);
    elements.newAnalysisBtn.addEventListener('click', handleNewAnalysis);

    // History Sidebar
    elements.clearHistoryBtn.addEventListener('click', handleClearHistory);
}

/**
 * Show API key modal
 */
function showApiKeyModal() {
    elements.apiKeyModal.style.display = 'flex';
    elements.apiKeyInput.focus();
}

/**
 * Hide API key modal
 */
function hideApiKeyModal() {
    elements.apiKeyModal.style.display = 'none';
}

/**
 * Handle saving API key
 */
function handleSaveApiKey() {
    const key = elements.apiKeyInput.value.trim();

    if (!key) {
        showError('请输入有效的 API 密钥');
        return;
    }

    // Basic validation - Gemini API keys are typically long strings
    if (key.length < 20) {
        showError('API 密钥似乎太短了，请检查后重试。');
        return;
    }

    saveApiKey(key);
    apiKey = key;
    hideApiKeyModal();
    showSuccess('API 密钥保存成功！');
}

/**
 * Handle file selection from input
 */
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

/**
 * Handle drag over event
 */
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.uploadArea.classList.add('drag-over');
}

/**
 * Handle drag leave event
 */
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.uploadArea.classList.remove('drag-over');
}

/**
 * Handle drop event
 */
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.uploadArea.classList.remove('drag-over');

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

/**
 * Process selected/dropped file
 */
async function processFile(file) {
    // Validate file
    const validation = validateImage(file);
    if (!validation.valid) {
        showError(validation.error);
        return;
    }

    try {
        // Compress image
        showLoading('Processing image...');
        const compressedImage = await compressImage(file, 1024, 0.8);

        // Store the compressed image
        currentImage = compressedImage;

        // Show preview
        elements.previewImage.src = compressedImage;
        showPreview();
        hideLoading();
    } catch (error) {
        console.error('Error processing image:', error);
        showError('Failed to process image. Please try another file.');
        hideLoading();
    }
}

/**
 * Show preview section
 */
function showPreview() {
    hideUpload();
    hideResults();
    hideError();
    elements.previewSection.style.display = 'flex';
    elements.previewSection.classList.add('fade-in');
}

/**
 * Hide preview section
 */
function hidePreview() {
    elements.previewSection.style.display = 'none';
}

/**
 * Show upload section
 */
function showUpload() {
    hidePreview();
    hideResults();
    hideError();
    elements.uploadArea.style.display = 'block';
    elements.uploadArea.classList.add('fade-in');
}

/**
 * Hide upload section
 */
function hideUpload() {
    elements.uploadArea.style.display = 'none';
}

/**
 * Show loading section
 */
function showLoading(message = '正在分析您的餐点...') {
    hideUpload();
    hidePreview();
    hideResults();
    hideError();
    elements.loadingSection.querySelector('p').textContent = message;
    elements.loadingSection.style.display = 'flex';
    elements.loadingSection.classList.add('fade-in');
}

/**
 * Hide loading section
 */
function hideLoading() {
    elements.loadingSection.style.display = 'none';
}

/**
 * Show error message
 */
function showError(message) {
    hideLoading();
    hideResults();
    elements.errorText.textContent = message;
    elements.errorMessage.style.display = 'flex';
    elements.errorMessage.classList.add('fade-in');
}

/**
 * Hide error message
 */
function hideError() {
    elements.errorMessage.style.display = 'none';
}

/**
 * Show success message (temporary)
 */
function showSuccess(message) {
    // Create temporary success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification fade-in';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Handle removing the preview image
 */
function handleRemoveImage() {
    currentImage = null;
    elements.fileInput.value = '';
    showUpload();
}

/**
 * Handle analyzing the food image
 */
async function handleAnalyze() {
    if (!currentImage) {
        showError('No image to analyze');
        return;
    }

    if (!apiKey) {
        showError('API key is required. Please set it in the settings.');
        showApiKeyModal();
        return;
    }

    try {
        showLoading('Analyzing your meal...');

        // Call Gemini API
        const result = await analyzeFoodImage(currentImage, apiKey);

        // Store the result
        currentAnalysisResult = result;

        // Display results
        displayResults(result);
        hideLoading();
    } catch (error) {
        console.error('Analysis error:', error);
        showError(error.message || 'Failed to analyze image. Please try again.');
        hideLoading();
    }
}

/**
 * Display analysis results
 */
function displayResults(result) {
    hidePreview();
    hideError();

    // Update total calories
    elements.totalCalories.textContent = Math.round(result.totalCalories);

    // Clear and populate food list
    elements.foodList.innerHTML = '';

    result.foods.forEach((food, index) => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item slide-in';
        foodItem.style.animationDelay = `${index * 0.1}s`;

        foodItem.innerHTML = `
            <div class="food-info">
                <div class="food-name">${escapeHtml(food.name)}</div>
                <div class="food-portion">${escapeHtml(food.portion)}</div>
            </div>
            <div class="food-calories">${Math.round(food.calories)} cal</div>
        `;

        elements.foodList.appendChild(foodItem);
    });

    // Show results section
    elements.resultsSection.style.display = 'block';
    elements.resultsSection.classList.add('fade-in');
}

/**
 * Hide results section
 */
function hideResults() {
    elements.resultsSection.style.display = 'none';
}

/**
 * Handle saving results to history
 */
function handleSaveToHistory() {
    if (!currentAnalysisResult) {
        showError('No analysis results to save');
        return;
    }

    const mealData = {
        imageThumbnail: currentImage,
        foods: currentAnalysisResult.foods,
        totalCalories: currentAnalysisResult.totalCalories,
        timestamp: new Date().toISOString()
    };

    const success = saveMeal(mealData);

    if (success) {
        showSuccess('Meal saved to history!');
        loadHistory();
    } else {
        showError('Failed to save meal. Please try again.');
    }
}

/**
 * Handle starting a new analysis
 */
function handleNewAnalysis() {
    currentImage = null;
    currentAnalysisResult = null;
    elements.fileInput.value = '';
    showUpload();
}

/**
 * Handle retry after error
 */
function handleRetry() {
    hideError();
    if (currentImage) {
        showPreview();
    } else {
        showUpload();
    }
}

/**
 * Load and display meal history
 */
function loadHistory() {
    const history = getMealHistory();

    // Update statistics
    elements.todayCalories.textContent = formatCalories(getTodayCalories());
    elements.weekCalories.textContent = formatCalories(getWeekCalories());

    // Clear history list
    elements.historyList.innerHTML = '';

    if (history.length === 0) {
        elements.historyList.innerHTML = `
            <div class="empty-history">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                <p>No meals recorded yet</p>
            </div>
        `;
        return;
    }

    // Display each meal
    history.forEach(meal => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item slide-in';

        const foodNames = meal.foods.map(f => f.name).join(', ');
        const truncatedFoods = foodNames.length > 50
            ? foodNames.substring(0, 50) + '...'
            : foodNames;

        historyItem.innerHTML = `
            <div class="history-item-header">
                <span class="history-date">${formatDate(meal.timestamp)}</span>
                <span class="history-calories">${formatCalories(meal.totalCalories)}</span>
            </div>
            <div class="history-foods">${escapeHtml(truncatedFoods)}</div>
            <button class="history-delete" data-id="${meal.id}">Delete</button>
        `;

        elements.historyList.appendChild(historyItem);
    });

    // Add delete event listeners
    document.querySelectorAll('.history-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mealId = e.target.dataset.id;
            handleDeleteMeal(mealId);
        });
    });
}

/**
 * Handle deleting a meal from history
 */
function handleDeleteMeal(mealId) {
    const success = deleteMeal(mealId);

    if (success) {
        showSuccess('Meal deleted');
        loadHistory();
    } else {
        showError('Failed to delete meal');
    }
}

/**
 * Handle clearing all history
 */
function handleClearHistory() {
    if (confirm('Are you sure you want to clear all meal history? This cannot be undone.')) {
        const success = clearHistory();

        if (success) {
            showSuccess('History cleared');
            loadHistory();
        } else {
            showError('Failed to clear history');
        }
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
