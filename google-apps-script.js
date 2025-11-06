// Google Apps Script to capture emails to Google Sheets
//
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com/
// 2. Click "New Project"
// 3. Copy this entire script into the editor
// 4. Replace 'YOUR_SPREADSHEET_ID' below with your actual Google Sheet ID
// 5. Click "Deploy" > "New deployment"
// 6. Choose type: "Web app"
// 7. Execute as: "Me"
// 8. Who has access: "Anyone"
// 9. Click "Deploy" and copy the web app URL
// 10. Update the form action URL in index.html with your deployed URL

function doPost(e) {
  try {
    // Replace with your Google Sheet ID (found in the URL)
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
    const SHEET_NAME = 'Waitlist';

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = new Date();

    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Email', 'Source']);
    }

    // Append the data
    sheet.appendRow([timestamp, email, 'Landing Page']);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Email added successfully!'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'Webhook is active'
  })).setMimeType(ContentService.MimeType.JSON);
}
