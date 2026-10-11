/**
 * Skyven enquiries → Google Sheets
 *
 * Setup (once):
 *  1. Create a Google Sheet for the leads (e.g. "Skyven Leads").
 *  2. In the sheet: Extensions → Apps Script. Replace the editor contents with this file.
 *  3. Set SECRET below to a long random string (the same value goes in GOOGLE_SHEETS_WEBHOOK_SECRET).
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *     Authorise when asked, then copy the Web app URL (ends in /exec).
 *  5. In the hosting environment set:
 *       GOOGLE_SHEETS_WEBHOOK_URL    = the Web app URL
 *       GOOGLE_SHEETS_WEBHOOK_SECRET = the SECRET below
 *  After editing this script later, use Deploy → Manage deployments → Edit → New version,
 *  so the same URL keeps working.
 */

const SECRET = "replace-with-a-long-random-string";
const SHEET_NAME = "Leads";

const COLUMNS = [
  ["Submitted (IST)", "submittedAtIST"],
  ["Name", "name"],
  ["Phone", "phone"],
  ["Email", "email"],
  ["Budget", "budget"],
  ["Form", "source"],
  ["UTM source", "utm_source"],
  ["UTM medium", "utm_medium"],
  ["UTM campaign", "utm_campaign"],
  ["Page", "page"],
  ["Consent", "consent"],
  ["Submitted (UTC)", "submittedAt"],
];

function doPost(e) {
  const lead = JSON.parse(e.postData.contents);
  if (lead.secret !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "unauthorised" })).setMimeType(
      ContentService.MimeType.JSON,
    );
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map(([header]) => header));
      sheet.setFrozenRows(1);
    }
    // Leading apostrophe keeps phone numbers like +91… as text
    sheet.appendRow(
      COLUMNS.map(([, key]) => {
        const value = lead[key];
        if (value === undefined || value === null) return "";
        if (key === "phone") return "'" + value;
        if (key === "consent") return value ? "Yes" : "No";
        return value;
      }),
    );
  } finally {
    lock.releaseLock();
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
