// Background service worker for PCT Reflection Reminder

// Import configuration
importScripts('config.js');

const REFLECTION_TOOL_URL = CONFIG.REFLECTION_TOOL_URL;

// Initialize alarm when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log('PCT Reflection Reminder installed');
  scheduleDailyReminder();
});

// Schedule the daily 3:00 PM reminder
function scheduleDailyReminder() {
  // Clear any existing alarm
  chrome.alarms.clear('dailyReflection');
  
  // Calculate next 3:00 PM
  const now = new Date();
  const next3PM = new Date();
  next3PM.setHours(15, 0, 0, 0); // 3:00 PM
  
  // If it's already past 3 PM today, schedule for tomorrow
  if (now > next3PM) {
    next3PM.setDate(next3PM.getDate() + 1);
  }
  
  // Skip weekends - if next 3PM is Saturday, schedule for Monday
  const dayOfWeek = next3PM.getDay();
  if (dayOfWeek === 6) { // Saturday
    next3PM.setDate(next3PM.getDate() + 2); // Move to Monday
  } else if (dayOfWeek === 0) { // Sunday
    next3PM.setDate(next3PM.getDate() + 1); // Move to Monday
  }
  
  console.log('Scheduling next reminder for:', next3PM);
  
  // Create alarm
  chrome.alarms.create('dailyReflection', {
    when: next3PM.getTime(),
    periodInMinutes: 24 * 60 // Repeat daily
  });
}

// Listen for alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyReflection') {
    // Check if it's a weekday
    const now = new Date();
    const dayOfWeek = now.getDay();
    
    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
      showReflectionNotification();
    }
    
    // Reschedule for next day
    scheduleDailyReminder();
  } else if (alarm.name === 'snoozeReminder') {
    showReflectionNotification();
  }
});

// Show the notification
function showReflectionNotification() {
  // Check if user already completed today's reflection
  chrome.storage.local.get(['lastReflectionDate'], (result) => {
    const today = new Date().toISOString().split('T')[0];
    
    if (result.lastReflectionDate === today) {
      console.log('Reflection already completed today');
      return;
    }
    
    // Show notification
    chrome.notifications.create('reflectionReminder', {
      type: 'basic',
      iconUrl: 'icon128.png',
      title: '📝 Time for Your Daily Reflection',
      message: 'Take a moment to reflect on your teaching day.',
      buttons: [
        { title: 'Add Reflection' },
        { title: 'Remind in 10 min' }
      ],
      requireInteraction: true, // Keeps notification visible until user interacts
      priority: 2
    });
  });
}

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (notificationId === 'reflectionReminder') {
    if (buttonIndex === 0) {
      // "Add Reflection" button
      chrome.tabs.create({ url: REFLECTION_TOOL_URL });
      chrome.notifications.clear(notificationId);
    } else if (buttonIndex === 1) {
      // "Remind in 10 min" button
      chrome.alarms.create('snoozeReminder', {
        delayInMinutes: 10
      });
      chrome.notifications.clear(notificationId);
    }
  }
});

// Handle notification close (dismissed)
chrome.notifications.onClosed.addListener((notificationId, byUser) => {
  if (notificationId === 'reflectionReminder' && byUser) {
    console.log('Notification dismissed by user');
  }
});

// Listen for messages from the reflection tool
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'reflectionCompleted') {
    const today = new Date().toISOString().split('T')[0];
    chrome.storage.local.set({ lastReflectionDate: today });
    chrome.notifications.clear('reflectionReminder');
    sendResponse({ success: true });
  }
});

// Initialize on startup
chrome.runtime.onStartup.addListener(() => {
  console.log('Chrome started, checking reminder schedule');
  scheduleDailyReminder();
});