# PCT Reflection Reminder - Chrome Extension

## Installation Instructions

### Step 1: Prepare the Extension Files

1. You should have a folder called `reflection-reminder-extension` with these files:
   - `manifest.json`
   - `background.js`
   - `popup.html`
   - `popup.js`
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

### Step 2: Update the URL to Your Reflection Tool

**IMPORTANT:** Before installing, you need to update the URL to point to your reflection tool.

Open **ONLY** the `config.js` file and find this line:

```javascript
REFLECTION_TOOL_URL: 'file:///path/to/your/daily-reflections.html'
```

Replace it with the actual path to your reflection tool:

**If using a local file:**
```javascript
REFLECTION_TOOL_URL: 'file:///C:/Users/YourName/teaching-tools/daily-reflections.html'
```

**If hosted online:**
```javascript
REFLECTION_TOOL_URL: 'https://yoursite.com/daily-reflections.html'
```

To find your local file path:
- **Windows:** Right-click the HTML file → Properties → copy the Location and add the filename
- **Mac:** Right-click the HTML file → Get Info → copy the path
- Make sure to use `file:///` at the start and forward slashes `/`

**That's it!** You only need to update this one file - both `background.js` and `popup.js` will automatically read from it.

### Step 3: Install the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle switch in the top right)
3. Click **Load unpacked**
4. Select the `reflection-reminder-extension` folder
5. The extension should now appear in your extensions list!

### Step 4: Test It

1. Click the extension icon (📝) in your Chrome toolbar
2. Click **Test Notification Now** to see what the 3 PM reminder will look like
3. Click the buttons in the notification to test:
   - **Add Reflection** - Opens your reflection tool
   - **Remind in 10 min** - Snoozes for 10 minutes

## How It Works

- **Daily Reminder:** Every weekday at 3:00 PM, you'll get a desktop notification
- **Weekends:** Automatically skipped
- **Persistent:** The notification stays visible until you interact with it
- **Snooze:** Click "Remind in 10 min" if you're busy
- **Auto-dismiss:** The notification disappears once you save a reflection for the day

## Notification Buttons

When the notification appears at 3:00 PM:
- **Add Reflection** - Opens the reflection tool in a new tab
- **Remind in 10 min** - Snoozes the reminder for 10 minutes
- **Dismiss (X)** - Closes the notification (you'll get reminded again tomorrow)

## Troubleshooting

**Notification not appearing:**
- Make sure Chrome has notification permissions enabled
- Check Chrome → Settings → Privacy and security → Site Settings → Notifications
- Chrome must be running (even in background) for notifications to work

**Extension not loading:**
- Make sure all files are in the folder
- Check that you updated the REFLECTION_TOOL_URL in both files
- Look for errors in chrome://extensions/ (click "Errors" button)

**Wrong time zone:**
- The extension uses your system time
- 3:00 PM is based on your computer's local time

## Updating the Extension

If you make changes to any files:
1. Go to `chrome://extensions/`
2. Click the refresh icon (↻) on the extension card
3. Your changes will be loaded

## Privacy Note

This extension:
- ✅ Only stores the last date you completed a reflection (locally)
- ✅ All data stays on your computer
- ✅ No tracking, no analytics, no internet connections
- ✅ Completely private and local
