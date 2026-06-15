/**
 * LocalStorage Management Module
 * Handles saving and retrieving meal history data
 */

const STORAGE_KEYS = {
    MEAL_HISTORY: 'eatwhat_meal_history',
    API_KEY: 'eatwhat_api_key'
};

function saveMeal(mealData) {
    try {
        const history = getMealHistory();
        const newMeal = {
            id: generateId(),
            imageThumbnail: mealData.imageThumbnail || null,
            foods: mealData.foods,
            totalCalories: mealData.totalCalories,
            timestamp: mealData.timestamp || new Date().toISOString()
        };
        history.unshift(newMeal);
        if (history.length > 100) history.length = 100;
        localStorage.setItem(STORAGE_KEYS.MEAL_HISTORY, JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('Error saving meal:', error);
        return false;
    }
}

function getMealHistory() {
    try {
        const historyJson = localStorage.getItem(STORAGE_KEYS.MEAL_HISTORY);
        if (!historyJson) return [];
        const history = JSON.parse(historyJson);
        return Array.isArray(history) ? history : [];
    } catch (error) {
        console.error('Error reading meal history:', error);
        return [];
    }
}

function deleteMeal(mealId) {
    try {
        const history = getMealHistory();
        const filteredHistory = history.filter(meal => meal.id !== mealId);
        localStorage.setItem(STORAGE_KEYS.MEAL_HISTORY, JSON.stringify(filteredHistory));
        return true;
    } catch (error) {
        console.error('Error deleting meal:', error);
        return false;
    }
}

function clearHistory() {
    try {
        localStorage.removeItem(STORAGE_KEYS.MEAL_HISTORY);
        return true;
    } catch (error) {
        console.error('Error clearing history:', error);
        return false;
    }
}

function getTodayCalories() {
    const history = getMealHistory();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return history.reduce((total, meal) => {
        const mealDate = new Date(meal.timestamp);
        mealDate.setHours(0, 0, 0, 0);
        if (mealDate.getTime() === today.getTime()) return total + meal.totalCalories;
        return total;
    }, 0);
}

function getWeekCalories() {
    const history = getMealHistory();
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return history.reduce((total, meal) => {
        const mealDate = new Date(meal.timestamp);
        if (mealDate >= sevenDaysAgo) return total + meal.totalCalories;
        return total;
    }, 0);
}

function saveApiKey(apiKey) {
    try {
        localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
        return true;
    } catch (error) {
        console.error('Error saving API key:', error);
        return false;
    }
}

function getApiKey() {
    try {
        return localStorage.getItem(STORAGE_KEYS.API_KEY);
    } catch (error) {
        console.error('Error reading API key:', error);
        return null;
    }
}

function removeApiKey() {
    try {
        localStorage.removeItem(STORAGE_KEYS.API_KEY);
        return true;
    } catch (error) {
        console.error('Error removing API key:', error);
        return false;
    }
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + ' 分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + ' 小时前';
    if (diff < 604800000) return Math.floor(diff / 86400000) + ' 天前';

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('zh-CN', options);
}

function formatCalories(calories) {
    return Math.round(calories) + ' cal';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveMeal, getMealHistory, deleteMeal, clearHistory,
        getTodayCalories, getWeekCalories,
        saveApiKey, getApiKey, removeApiKey,
        formatDate, formatCalories
    };
}
