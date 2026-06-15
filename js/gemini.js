/**
 * Gemini API Integration Module
 * Handles food image analysis using Google's Gemini Vision API
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

/**
 * Analyze a food image using Gemini API
 * @param {string} imageBase64 - Base64 encoded image data
 * @param {string} apiKey - Gemini API key
 * @returns {Promise<Object>} Analysis result with food items and calories
 */
async function analyzeFoodImage(imageBase64, apiKey) {
    if (!apiKey) {
        throw new Error('API key is required');
    }

    if (!imageBase64) {
        throw new Error('Image data is required');
    }

    // Remove data URL prefix if present
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const prompt = `You are a professional nutritionist and food expert. Analyze this food image and provide detailed information.

Please identify ALL visible food items in the image and for each item provide:
1. Food name (be specific about the dish/ingredient)
2. Estimated portion size (in grams or common measurements like "1 cup", "2 slices", etc.)
3. Approximate calorie count based on the portion size

Return the response in valid JSON format with the following structure:
{
  "foods": [
    {
      "name": "Food name",
      "portion": "Portion size",
      "calories": number
    }
  ],
  "totalCalories": total_number,
  "confidence": "high/medium/low"
}

Be realistic with portion sizes and calorie estimates. If you're uncertain about something, indicate it. Consider cooking methods (fried, grilled, etc.) when estimating calories.`;

    // 创建带超时的 fetch 请求
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时

    try {
        console.log('开始发送请求到 Gemini API...');
        
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            text: prompt
                        },
                        {
                            inline_data: {
                                mime_type: 'image/jpeg',
                                data: base64Data
                            }
                        }
                    ]
                }],
                generationConfig: {
                    temperature: 0.4,
                    topK: 32,
                    topP: 1,
                    maxOutputTokens: 2048,
                }
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        console.log('收到 API 响应，状态码:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 401) {
                throw new Error('API 密钥无效，请检查您的 Gemini API 密钥。');
            } else if (response.status === 429) {
                throw new Error('API 配额已用完，请稍后重试。');
            } else if (response.status === 400) {
                throw new Error('请求无效，图片可能太大或格式不支持。');
            } else {
                throw new Error(errorData.error?.message || `API 错误：${response.status}`);
            }
        }

        const data = await response.json();

        // Extract the response text
        const candidates = data.candidates;
        if (!candidates || candidates.length === 0) {
            throw new Error('No response from Gemini API');
        }

        const content = candidates[0].content;
        if (!content || !content.parts || content.parts.length === 0) {
            throw new Error('Empty response from API');
        }

        const responseText = content.parts[0].text;

        // Parse JSON from response (handle cases where JSON might be wrapped in markdown code blocks)
        let jsonString = responseText.trim();

        // Remove markdown code block markers if present
        if (jsonString.startsWith('```json')) {
            jsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (jsonString.startsWith('```')) {
            jsonString = jsonString.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        // Find JSON object in the text
        const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonString = jsonMatch[0];
        }

        const result = JSON.parse(jsonString);

        // Validate the result structure
        if (!result.foods || !Array.isArray(result.foods)) {
            throw new Error('响应格式无效：缺少 foods 数组');
        }

        if (typeof result.totalCalories !== 'number') {
            throw new Error('响应格式无效：缺少 totalCalories');
        }

        return {
            foods: result.foods.map(food => ({
                name: food.name || '未知食物',
                portion: food.portion || '未知份量',
                calories: Number(food.calories) || 0
            })),
            totalCalories: Number(result.totalCalories) || 0,
            confidence: result.confidence || 'medium'
        };

    } catch (error) {
        clearTimeout(timeoutId);
        
        // 处理超时错误
        if (error.name === 'AbortError') {
            throw new Error('请求超时，请检查网络连接后重试。');
        }
        
        console.error('Gemini API 错误:', error);
        
        if (error instanceof SyntaxError) {
            throw new Error('解析 API 响应失败，请重试。');
        }
        throw error;
    }
}

/**
 * Compress an image to reduce file size before sending to API
 * @param {File} file - The image file to compress
 * @param {number} maxWidth - Maximum width of the compressed image
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<string>} Compressed image as base64 data URL
 */
function compressImage(file, maxWidth = 1024, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                // Calculate new dimensions while maintaining aspect ratio
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                // Create canvas and draw resized image
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to base64
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataUrl);
            };

            img.onerror = () => {
                reject(new Error('加载图片失败'));
            };

            img.src = e.target.result;
        };

        reader.onerror = () => {
            reject(new Error('读取文件失败'));
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum file size in MB
 * @returns {Object} Validation result { valid: boolean, error: string }
 */
function validateImage(file, maxSizeMB = 10) {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Please upload JPG, PNG, or WEBP images.'
        };
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return {
            valid: false,
            error: `File too large. Maximum size is ${maxSizeMB}MB.`
        };
    }

    return { valid: true, error: null };
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeFoodImage,
        compressImage,
        validateImage
    };
}
