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
  chrome.runtime.sendMessage({ action: 'testNotification' });
  window.close();
});

// Initialize
updateNextReminderDisplay();