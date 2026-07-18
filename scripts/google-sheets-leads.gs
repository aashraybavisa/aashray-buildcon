const LEADS_SHEET_NAME = 'Leads'
const LEADS_HEADERS = ['Submitted at', 'Form', 'Name', 'Email', 'Phone', 'Project', 'Message']

/**
 * Bind this script to the Google Sheet that should receive website leads.
 * Deploy it as a Web App and place the resulting /exec URL in EXPO_PUBLIC_LEAD_ENDPOINT.
 */
function doPost(event) {
  try {
    const lead = JSON.parse(event.postData?.contents || '{}')
    const sheet = getLeadsSheet()

    sheet.appendRow([
      lead.submittedAt || new Date().toISOString(),
      lead.form || '',
      lead.name || '',
      lead.email || '',
      lead.phone || '',
      lead.project || '',
      lead.message || '',
    ])

    return json({ ok: true })
  } catch (error) {
    console.error(error)
    return json({ ok: false })
  }
}

function doGet() {
  return json({ ok: true, service: 'aashray-buildcon-leads' })
}

function getLeadsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = spreadsheet.getSheetByName(LEADS_SHEET_NAME)

  if (!sheet) {
    sheet = spreadsheet.insertSheet(LEADS_SHEET_NAME)
    sheet.appendRow(LEADS_HEADERS)
    sheet.setFrozenRows(1)
  }

  return sheet
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
}
