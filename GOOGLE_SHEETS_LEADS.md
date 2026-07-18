# Google Sheets lead delivery

This project sends Quote and Contact submissions as JSON to a Google Apps Script Web App, which appends them to a `Leads` worksheet.

## One-time setup

1. Create a Google Sheet for incoming leads.
2. Open **Extensions → Apps Script** from that sheet.
3. Replace the editor contents with [`scripts/google-sheets-leads.gs`](scripts/google-sheets-leads.gs).
4. Click **Deploy → New deployment**, select **Web app**, and deploy it to run as the account that owns the sheet. Configure access so that public visitors can submit the form, then complete Google’s authorization prompt.
5. Copy the deployed URL ending in `/exec`—not the editor-only `/dev` URL.
6. Create `.env` in the repository root using `.env.example`, then set:

   ```env
   EXPO_PUBLIC_LEAD_ENDPOINT=https://script.google.com/macros/s/your-deployment-id/exec
   ```

7. Restart Expo after changing the environment variable and submit a test lead.

The script creates the `Leads` tab and header row on the first submission. Browsers do not reliably expose the response body from public Apps Script web apps, so the site uses a compatible fire-and-forget request for this receiver. Check the sheet after the first live test. The public endpoint is protected in the UI by validation and a spam honeypot; review the sheet regularly and add a dedicated form provider or serverless layer later if stronger server-side abuse protection is needed.

Google Apps Script web apps receive POST requests through `doPost(e)`, and `Sheet.appendRow()` adds each lead to the sheet. See Google’s [Web Apps guide](https://developers.google.com/apps-script/guides/web) and [Sheet reference](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
