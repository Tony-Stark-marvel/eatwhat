# -*- coding: utf-8 -*-
"""
Script to translate app.js from English to Chinese
"""

import re

# 读取文件
with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 定义替换映射
replacements = {
    # API Key相关
    "'Please enter a valid API key'": "'请输入有效的 API 密钥'",
    "'API key appears to be too short. Please check and try again.'": "'API 密钥似乎太短了，请检查后重试。'",
    "'API key saved successfully!'": "'API 密钥保存成功！'",

    # 图像处理相关
    "'Processing image...'": "'正在处理图片...'",
    "'Failed to process image. Please try another file.'": "'处理图片失败，请尝试其他文件。'",

    # 分析相关
    "'No image to analyze'": "'没有可分析的图片'",
    "'API key is required. Please set it in the settings.'": "'需要 API 密钥，请在设置中配置。'",
    "'Analyzing your meal...'": "'正在分析您的餐点...'",
    "'Failed to analyze image. Please try again.'": "'分析图片失败，请重试。'",

    # 保存相关
    "'No analysis results to save'": "'没有可保存的分析结果'",
    "'Meal saved to history!'": "'餐点已保存到历史！'",
    "'Failed to save meal. Please try again.'": "'保存餐点失败，请重试。'",

    # 删除相关
    "'Meal deleted'": "'餐点已删除'",
    "'Failed to delete meal'": "'删除餐点失败'",

    # 清除历史
    "'Are you sure you want to clear all meal history? This cannot be undone.'": "'确定要清除所有餐点历史吗？此操作无法撤销。'",
    "'History cleared'": "'历史已清除'",
    "'Failed to clear history'": "'清除历史失败'",

    # 加载提示
    "'This may take a few seconds'": "'这可能需要几秒钟'",
}

# 执行替换
for old, new in replacements.items():
    content = content.replace(old, new)

# 写回文件
with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully updated app.js with Chinese text')
