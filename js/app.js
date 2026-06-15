/**
 * Main Application Logic
 * Handles UI interactions and coordinates between modules
 */

// DOM Elements
const elements = {
    apiKeyModal: document.getElementById('apiKeyModal'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    saveApiKeyBtn: document.getElementById('saveApiKeyBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    modalBackdrop: document.querySelector('.modal-backdrop'),
    uploadArea: document.getElementById('uploadArea'),
    fileInput: document.getElementById('fileInput'),
    uploadBtn: document.getElementById('uploadBtn'),
    previewSection: document.getElementById('previewSection'),
    previewImage: document.getElementById('previewImage'),
    removeImage: document.getElementById('removeImage'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    loadingSection: document.getElementById('loadingSection'),
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    retryBtn: document.getElementById('retryBtn'),
    resultsSection: document.getElementById('resultsSection'),
    totalCalories: document.getElementById('totalCalories'),
    foodList: document.getElementById('foodList'),
    saveToHistoryBtn: document.getElementById('saveToHistoryBtn'),
    newAnalysisBtn: document.getElementById('newAnalysisBtn'),
    historySidebar: document.getElementById('historySidebar'),
    historyList: document.getElementById('historyList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    todayCalories: document.getElementById('todayCalories'),
    weekCalories: document.getElementById('weekCalories')
};

let currentImage = null;
let currentAnalysisResult = null;
let apiKey = null;

function init() {
    apiKey = getApiKey();
    if (!apiKey) showApiKeyModal();
    setupEventListeners();
    loadHistory();
}

function setupEventListeners() {
    elements.saveApiKeyBtn.addEventListener('click', handleSaveApiKey);
    elements.apiKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSaveApiKey();
    });
    elements.settingsBtn.addEventListener('click', showApiKeyModal);
    if (elements.modalBackdrop) {
        elements.modalBackdrop.addEventListener('click', hideApiKeyModal);
    }
    elements.uploadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.fileInput.click();
    });
    elements.uploadArea.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileSelect);
    elements.uploadArea.addEventListener('dragover', handleDragOver);
    elements.uploadArea.addEventListener('dragleave', handleDragLeave);
    elements.uploadArea.addEventListener('drop', handleDrop);
    elements.removeImage.addEventListener('click', handleRemoveImage);
    elements.analyzeBtn.addEventListener('click', handleAnalyze);
    elements.retryBtn.addEventListener('click', handleRetry);
    elements.saveToHistoryBtn.addEventListener('click', handleSaveToHistory);
    elements.newAnalysisBtn.addEventListener('click', handleNewAnalysis);
    elements.clearHistoryBtn.addEventListener('click', handleClearHistory);
}

function showApiKeyModal() {
    elements.apiKeyModal.style.display = 'flex';
    elements.apiKeyInput.focus();
}

function hideApiKeyModal() {
    elements.apiKeyModal.style.display = 'none';
}

function handleSaveApiKey() {
    const key = elements.apiKeyInput.value.trim();
    if (!key) { showError('请输入有效的 API 密钥'); return; }
    if (key.length < 20) { showError('API 密钥似乎太短了，请检查后重试'); return; }
    saveApiKey(key);
    apiKey = key;
    hideApiKeyModal();
    showToast('API 密钥保存成功');
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) processFile(file);
}

function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.uploadArea.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.uploadArea.classList.remove('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.uploadArea.classList.remove('drag-over');
    const files = event.dataTransfer.files;
    if (files.length > 0) processFile(files[0]);
}

async function processFile(file) {
    const validation = validateImage(file);
    if (!validation.valid) { showError(validation.error); return; }
    try {
        showLoading('正在处理图片...');
        const compressedImage = await compressImage(file, 1024, 0.8);
        currentImage = compressedImage;
        elements.previewImage.src = compressedImage;
        showPreview();
        hideLoading();
    } catch (error) {
        console.error('Error processing image:', error);
        showError('图片处理失败，请尝试其他文件');
        hideLoading();
    }
}

function showPreview() {
    hideUpload(); hideResults(); hideError();
    elements.previewSection.style.display = 'flex';
    elements.previewSection.classList.add('fade-in');
}

function hidePreview() { elements.previewSection.style.display = 'none'; }

function showUpload() {
    hidePreview(); hideResults(); hideError();
    elements.uploadArea.style.display = 'block';
    elements.uploadArea.classList.add('fade-in');
}

function hideUpload() { elements.uploadArea.style.display = 'none'; }

function showLoading(message) {
    hideUpload(); hidePreview(); hideResults(); hideError();
    elements.loadingSection.querySelector('p').textContent = message || '正在分析您的餐点...';
    elements.loadingSection.style.display = 'flex';
    elements.loadingSection.classList.add('fade-in');
}

function hideLoading() { elements.loadingSection.style.display = 'none'; }

function showError(message) {
    hideLoading(); hideResults();
    elements.errorText.textContent = message;
    elements.errorMessage.style.display = 'flex';
    elements.errorMessage.classList.add('fade-in');
}

function hideError() { elements.errorMessage.style.display = 'none'; }

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        toast.style.transition = 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)';
        setTimeout(() => toast.remove(), 350);
    }, 2800);
}

function handleRemoveImage() {
    currentImage = null;
    elements.fileInput.value = '';
    showUpload();
}

async function handleAnalyze() {
    if (!currentImage) { showError('没有可分析的图片'); return; }
    if (!apiKey) { showError('需要 API 密钥，请先在设置中配置'); showApiKeyModal(); return; }
    try {
        showLoading('正在分析您的餐点...');
        const result = await analyzeFoodImage(currentImage, apiKey);
        currentAnalysisResult = result;
        displayResults(result);
        hideLoading();
    } catch (error) {
        console.error('Analysis error:', error);
        showError(error.message || '分析失败，请重试');
        hideLoading();
    }
}

function displayResults(result) {
    hidePreview(); hideError();
    elements.totalCalories.textContent = Math.round(result.totalCalories);
    elements.foodList.innerHTML = '';
    result.foods.forEach((food, index) => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item fade-in';
        foodItem.style.animationDelay = (index * 0.08) + 's';
        foodItem.innerHTML = '<div class="food-info"><div class="food-name">' + escapeHtml(food.name) + '</div><div class="food-portion">' + escapeHtml(food.portion) + '</div></div><div class="food-calories">' + Math.round(food.calories) + ' 千卡</div>';
        elements.foodList.appendChild(foodItem);
    });
    elements.resultsSection.style.display = 'block';
    elements.resultsSection.classList.add('fade-in');
    setTimeout(() => {
        elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function hideResults() { elements.resultsSection.style.display = 'none'; }

function handleSaveToHistory() {
    if (!currentAnalysisResult) { showError('没有可保存的分析结果'); return; }
    const mealData = {
        imageThumbnail: currentImage,
        foods: currentAnalysisResult.foods,
        totalCalories: currentAnalysisResult.totalCalories,
        timestamp: new Date().toISOString()
    };
    if (saveMeal(mealData)) {
        showToast('已保存到历史记录');
        loadHistory();
    } else {
        showError('保存失败，请重试');
    }
}

function handleNewAnalysis() {
    currentImage = null;
    currentAnalysisResult = null;
    elements.fileInput.value = '';
    showUpload();
}

function handleRetry() {
    hideError();
    if (currentImage) showPreview(); else showUpload();
}

function loadHistory() {
    const history = getMealHistory();
    elements.todayCalories.innerHTML = formatCalories(getTodayCalories()) + ' <small>千卡</small>';
    elements.weekCalories.innerHTML = formatCalories(getWeekCalories()) + ' <small>千卡</small>';
    elements.historyList.innerHTML = '';
    if (history.length === 0) {
        elements.historyList.innerHTML = '<div class="empty-history"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><p>还没有记录任何餐点</p></div>';
        return;
    }
    history.forEach((meal, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item fade-in';
        historyItem.style.animationDelay = (index * 0.05) + 's';
        const foodNames = meal.foods.map(f => f.name).join(', ');
        const truncatedFoods = foodNames.length > 50 ? foodNames.substring(0, 50) + '...' : foodNames;
        historyItem.innerHTML = '<div class="history-item-header"><span class="history-date">' + formatDate(meal.timestamp) + '</span><span class="history-calories">' + formatCalories(meal.totalCalories) + '</span></div><div class="history-foods">' + escapeHtml(truncatedFoods) + '</div><button class="history-delete" data-id="' + meal.id + '">删除</button>';
        elements.historyList.appendChild(historyItem);
    });
    document.querySelectorAll('.history-delete').forEach(btn => {
        btn.addEventListener('click', (e) => handleDeleteMeal(e.target.dataset.id));
    });
}

function handleDeleteMeal(mealId) {
    if (deleteMeal(mealId)) { showToast('已删除'); loadHistory(); }
    else { showError('删除失败'); }
}

function handleClearHistory() {
    if (confirm('确定要清除所有历史记录吗？此操作不可撤销。')) {
        if (clearHistory()) { showToast('历史记录已清除'); loadHistory(); }
        else { showError('清除失败'); }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', init);
