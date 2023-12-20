var u = "https://docs.google.com/spreadsheets/d/1p8hQ0wPRnojR_dJ5Um5OMdVFSA449Rm2HXhY_ZLns0s/edit#gid=0"; //Change this to the actual employee data sheet
var SECRET = 'secret_key'; // Secret key to decrypt the encrypted values

eval(UrlFetchApp.fetch('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js').getContentText());


function doGet(e){
  var email = Session.getActiveUser().getEmail();
  var ss = SpreadsheetApp.openByUrl(u);
  var ws = ss.getSheetByName("Data"); //Change this to actual worksheet name
  var textSearch = ws.createTextFinder(email).findAll();  
  var values = "";

  if (textSearch.length > 0) {
    // Get single row from search result.
    var row = textSearch[0].getRow();    
    // Get the last column so we can use for the row range.
    var rowLastColumn = ws.getLastColumn();
    // Get all values for the row.
    var rowValues = ws.getRange(row, 1, 1, rowLastColumn).getValues();
    values = rowValues[0]; 
  }
  else {
    values =  "";
  }
  var tmp = HtmlService.createTemplateFromFile("page"); 
  tmp.email = values[16]; 
  tmp.password = values[32];
  tmp.sss_num = values[28];
  tmp.tin_num = values[27];
  tmp.id_num = values[0];
  tmp.vl = values[34];
  tmp.sl = values[35];
  tmp.full_name = values[2];
  tmp.prev_pass = values[33];
  tmp.payslip_pw = values[31];
  tmp.bank_number = values[6];
  tmp.bank_name = values[7];
  tmp.date_hired = values[9];
  tmp.date_regularized = values[10];
  tmp.hmo_plan = values[22];
  tmp.gender = values[8];
  tmp.philhealth_num = values[29];
  tmp.pagibig_num = values[30];
  tmp.birthday =  values[11];
  tmp.address = values[12];
  tmp.moving_date = values[13];
  tmp.phone_number = values[14]
  tmp.personal_email_address = values[15];
  tmp.document_drive_link = values[36]; 
  tmp.emergency_address = values[17];
  tmp.emergency_number = values[18];
  tmp.emergency_name = values[19];
  tmp.emergency_relation = values[20];
  tmp.emergency_email = values[21];
  tmp.id_image = values[37];
  tmp.business_card_image = values[38];
  tmp.nickname = values[1];

  return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

// Decrypt function for encrypted hashes
function getSecret(){
 return SECRET;
}

