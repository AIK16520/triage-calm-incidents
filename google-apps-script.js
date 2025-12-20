/**
 * Google Apps Script for Triage Waitlist Form
 * 
 * Instructions:
 * 1. Create a Google Sheet with headers: Timestamp, Name, Email, Company, Team Size, Comments
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code
 * 4. Deploy as Web App (Execute as: Me, Who has access: Anyone)
 * 5. Copy the Web App URL and add it to your .env file as VITE_GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Create timestamp
    const timestamp = new Date();
    
    // Prepare row data
    const row = [
      timestamp,
      data.name || '',
      data.email || '',
      data.company || '',
      data.teamSize || '',
      data.comments || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify the script works
function test() {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    company: "Test Company",
    teamSize: "11-50",
    comments: "This is a test submission"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

