/**
 * LocalStorage Management Module
 * Handles saving and retrieving meal history data
 */

const STORAGE_KEYS = {
    MEAL_HISTORY: 'eatwhat_meal_history',
    API_KEY: 'eatwhat_api_key'
};

/**
 * Save a meal record to history
 * @param {Object} mealData - Meal data to save
 * @param {string} mealData.imageThumbnail - Base64 thumbnail of the food image
 * @param {Array} mealData.foods - Array of food items analyzed
 * @param {number} mealData.totalCalories - Total calories for the meal
 * @param {string} mealData.timestamp - ISO timestamp of when meal was recorded
 * @returns {boolean} Success status
 */
function saveMeal(mealData) {
    try {
        const history = getMealHistory();

        // Add new meal to the beginning of the array
        const newMeal = {
            id: generateId(),
            imageThumbnail: mealData.imageThumbnail || null,
            foods: mealData.foods,
            totalCalories: mealData.totalCalories,
            timestamp: mealData.timestamp || new Date().toISOString()
        };

        history.unshift(newMeal);

        // Limit history to last 100 entries to prevent storage overflow
        if (history.length > 100) {
            history.length = 100;
        }

        localStorage.setItem(STORAGE_KEYS.MEAL_HISTORY, JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('Error saving meal:', error);
        return false;
    }
}

/**
 * Get all meal history
 * @returns {Array} Array of meal records, sorted by date (newest first)
 */
function getMealHistory() {
    try {
        const historyJson = localStorage.getItem(STORAGE_KEYS.MEAL_HISTORY);
        if (!historyJson) {
            return [];
        }

        const history = JSON.parse(historyJson);
        return Array.isArray(history) ? history : [];
    } catch (error) {
        console.error('Error reading meal history:', error);
        return [];
    }
}

/**
 * Delete a specific meal from history
 * @param {string} mealId - ID of the meal to delete
 * @returns {boolean} Success status
 */
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

/**
 * Clear all meal history
 * @returns {boolean} Success status
 */
function clearHistory() {
    try {
        localStorage.removeItem(STORAGE_KEYS.MEAL_HISTORY);
        return true;
    } catch (error) {
        console.error('Error clearing history:', error);
        return false;
    }
}

/**
 * Get today's total calories
 * @returns {number} Total calories consumed today
 */
function getTodayCalories() {
    const history = getMealHistory();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return history.reduce((total, meal) => {
        const mealDate = new Date(meal.timestamp);
        mealDate.setHours(0, 0, 0, 0);

        if (mealDate.getTime() === today.getTime()) {
            return total + meal.totalCalories;
        }
        return total;
    }, 0);
}

/**
 * Get this week's total calories (last 7 days)
 * @returns {number} Total calories consumed this week
 */
function getWeekCalories() {
    const history = getMealHistory();
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return history.reduce((total, meal) => {
        const mealDate = new Date(meal.timestamp);
        if (mealDate >= sevenDaysAgo) {
            return total + meal.totalCalories;
        }
        return total;
    }, 0);
}

/**
 * Save API key to localStorage
 * @param {string} apiKey - Gemini API key
 * @returns {boolean} Success status
 */
function saveApiKey(apiKey) {
    try {
        localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
        return true;
    } catch (error) {
        console.error('Error saving API key:', error);
        return false;
    }
}

/**
 * Get saved API key
 * @returns {string|null} API key or null if not set
 */
function getApiKey() {
    try {
        return localStorage.getItem(STORAGE_KEYS.API_KEY);
    } catch (error) {
        console.error('Error reading API key:', error);
        return null;
    }
}

/**
 * Remove saved API key
 * @returns {boolean} Success status
 */
function removeApiKey() {
    try {
        localStorage.removeItem(STORAGE_KEYS.API_KEY);
        return true;
    } catch (error) {
        console.error('Error removing API key:', error);
        return false;
    }
}

/**
 * Generate a unique ID for meal records
 * @returns {string} Unique ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format date for display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted date string
 */
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // Less than 1 minute
    if (diff < 60000) {
        return '刚刚';
    }

    // Less than 1 hour
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}分钟前`;
    }

    // Less than 24 hours
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}小时前`;
    }

    // Less than 7 days
    if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days}天前`;
    }

    // Format as date
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('zh-CN', options);
}

/**
 * Format calories for display
 * @param {number} calories - Calorie count
 * @returns {string} Formatted calorie string
 */
function formatCalories(calories) {
    return `${Math.round(calories)} cal`;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveMeal,
        getMealHistory,
        deleteMeal,
        clearHistory,
        getTodayCalories,
        getWeekCalories,
        saveApiKey,
        getApiKey,
        removeApiKey,
        formatDate,
        formatCalories
    };
}
