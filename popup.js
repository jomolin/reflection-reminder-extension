// Popup script for PCT Reflection Reminder

// Get URL from config
const REFLECTION_TOOL_URL = CONFIG.REFLECTION_TOOL_URL;

// Update next reminder time display
function updateNextReminderDisplay() {
  chrome.alarms.get('dailyReflection', (alarm) => {
    const statusEl = document.getElementById('nextReminder');
    
    if (alarm) {
      const nextTime = new Date(alarm.scheduledTime);
      const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
      };
      statusEl.textContent = nextTime.toLocaleString('en-NZ', options);
    } else {
      statusEl.textContent = 'Not scheduled';
    }
  });
}

// Open reflection tool
document.getElementById('openReflection').addEventListener('click', () => {
  chrome.tabs.create({ url: REFLECTION_TOOL_URL });
  window.close();
});

// Test notification
document.getElementById('testNotification').addEventListener('click', () => {
  chrome.notifications.create('testNotification', {
    type: 'basic',
    iconUrl: 'icon128.png',
    title: '📝 Time for Your Daily Reflection',
    message: 'Take a moment to reflect on your teaching day. (This is a test)',
    buttons: [
      { title: 'Add Reflection' },
      { title: 'Remind in 10 min' }
    ],
    requireInteraction: true,
    priority: 2
  });
  
  window.close();
});

// Initialize
updateNextReminderDisplay();
