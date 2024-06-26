// Order confirmation template for User
export const orderConfirmTemplateToUser = async (
  fullName: string,
  email: string,
  totalCartAmount: number,
  date: string,
  time: string,
  dayTime: string,
  confirmOrderHTML: string,
  orderNumber: string,
  streetAddress: string,
  nearByAddress: string,
  cityName: string,
  stateName: string,
  country: string,
  areaPincode: number,
  mobileNumber: number
) => {
  return `<!DOCTYPE html>
  <html>
  <head>
  <title>Order Confirmation Mail</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <style type="text/css">
  
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; }
  
  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  table { border-collapse: collapse !important; }
  body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
  
  
  a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
  }
  
  @media screen and (max-width: 480px) {
      .mobile-hide {
          display: none !important;
      }
      .mobile-center {
          text-align: center !important;
      }
  }
  div[style*="margin: 16px 0;"] { margin: 0 !important; }
  </style>
  <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">       
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
              <tr>
                  <td align="center" valign="top" style="font-size:0; padding: 20px;" bgcolor="#606060">
                  <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                          <tr>
                              <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                  <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">UrbanCart</h1>
                              </td>
                          </tr>
                      </table>
                  </div>
                  <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                          <tr>
                              <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                  <table cellspacing="0" cellpadding="0" border="0" align="right">
                                      <tr>
                                          <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                              <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a></p>
                                          </td>
                                          <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                              <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;"/></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </div>
                
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                    <h2>Dear ${fullName}</h2>
                      <tr>
                          <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 1px; ">
                              <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                              <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                Order Confirmation
                              </h2>
                              <p class="muted"
                              style="mso-line-height-rule: exactly; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Arial,'Karla'; font-size: 14px; line-height: 26px; font-weight: normal; color: #bdbdbd; margin: 0;"
                              align="center">${date} ${time} ${dayTime}</p>
                          </td>
                      </tr>
                      <tr>
                          <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                              <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                We've got your order! Your world is about to look a whole lot better.We'll drop you another email when your order
                                ships.
                              </p>
                          </td>
                      </tr>
                      <tr>
                          <td align="left" style="padding-top: 20px;">
                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                      <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          Order Number
                                      </td>
                                      <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          ${orderNumber}
                                      </td>
                                  </tr>
                              </table>
                              <table>
                                <thead>
                                  <tr>
                                    <th width="35%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;  border-bottom: 3px solid #eeeeee;">
                                      Purchased Item
                                  </th>
                                  <th width="23%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;  border-bottom: 3px solid #eeeeee;">
                                    Quantity
                                </th>
                                <th width="24%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;  border-bottom: 3px solid #eeeeee;">
                                  Unit Price
                              </th>
                              <th width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;  border-bottom: 3px solid #eeeeee;">
                                Total Price
                            </th>
                                  </tr>
                                </thead>
                                <tbody id="productRows">
                                  ${confirmOrderHTML}
                                </tbody>
                              </table>
                                  
                          </td>
                      </tr>
                      <tr>
                          <td align="left" style="padding-top: 20px;">
                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; ">
                                          SUB TOTAL
                                      </td>
                                      <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; ">
                                      ₹ ${totalCartAmount}
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
                  
                  </td>
              </tr>
               <tr>
                  <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                  <tr>
                  <td align="center" valign="top" style="font-size:0;">
                      <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">

                          <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                              <tr>
                                  <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                      <p style="font-weight: 800;">Delivery Address</p>
                                      <p>${streetAddress}<br>${nearByAddress}<br>${cityName}, ${stateName}<br>${country}, ${areaPincode}</p>

                                  </td>
                              </tr>
                          </table>
                      </div>
                      <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                          <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                              <tr>
                                  <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                      <p style="font-weight: 800;">User Information</p>
                                      <p>Mobile: ${mobileNumber}<br>Email: ${email}</p>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </td>
              </tr>
                  </table>
                  </td>
              </tr>
              <tr>
                  <td align="center" style="  background-color: #606060;" bgcolor="#1b9ba3">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                              <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                  Shope Again Click The Link Below.
                              </h2>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="padding: 8px 0 5px 0;">
                              <table border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                        <a href="http://192.168.1.151:3000" target="_blank" style="font-size: 15px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #66B2FF; padding: 12px 25px; border: 1px solid #66B2FF; display: block;">Shop Again</a>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                              <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                UrbanCart 🛒<br>1231 Street, Modal Gram<br>Ludhiana, Punjab-141002
                              </p>
                          </td>
                      </tr>
                  </table>
                  </td>
              </tr>
          </table>
          </td>
      </tr>
  </table>
  </body>
  </html>  
        `;
};

// Order confirmation template for Admin
export const orderConfirmTemplateToAdmin = (
  fullName: string,
  email: string,
  totalCartAmount: number,
  date: string,
  time: string,
  dayTime: string,
  confirmOrderHTML: string,
  orderNumber: string,
  streetAddress: string,
  nearByAddress: string,
  cityName: string,
  stateName: string,
  country: string,
  areaPincode: number,
  mobileNumber: number
) => {
  return `<!DOCTYPE html>
  <html>
  <head>
  <title>Order Confirmation Mail</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <style type="text/css">
  
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; }
  
  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  table { border-collapse: collapse !important; }
  body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
  
  
  a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
  }
  
  @media screen and (max-width: 480px) {
      .mobile-hide {
          display: none !important;
      }
      .mobile-center {
          text-align: center !important;
      }
  }
  div[style*="margin: 16px 0;"] { margin: 0 !important; }
  </style>
  <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">       
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
              <tr>
                  <td align="center" valign="top" style="font-size:0; padding: 20px;" bgcolor="#606060">
                  <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                          <tr>
                              <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                  <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">UrbanCart</h1>
                              </td>
                          </tr>
                      </table>
                  </div>
                  <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                          <tr>
                              <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                  <table cellspacing="0" cellpadding="0" border="0" align="right">
                                      <tr>
                                          <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                              <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a></p>
                                          </td>
                                          <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                              <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;"/></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </div>
                
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 35px 35px 2px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                    <h2>${fullName} has placed the order</h2>
                    <p>Mobile: ${mobileNumber}<br>Email: ${email}</p>
                      <tr>
                          <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 1px; ">
                              <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                              <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                Order Confirmation
                              </h2>
                              <p class="muted"
                              style="mso-line-height-rule: exactly; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Arial,'Karla'; font-size: 14px; line-height: 26px; font-weight: normal; color: #bdbdbd; margin: 0;"
                              align="center">${date} ${time} ${dayTime}</p>
                          </td>
                      </tr>
                      <tr>
                          <td align="left" style="padding-top: 20px;">
                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                      <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          Order Number
                                      </td>
                                      <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          ${orderNumber}
                                      </td>
                                  </tr>
                              </table>
                              <table>
                                <thead>
                                  <tr>
                                    <th width="35%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;  border-bottom: 3px solid #eeeeee;">
                                      Purchased Item
                                  </th>
                                  <th width="23%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;  border-bottom: 3px solid #eeeeee;">
                                    Quantity
                                </th>
                                <th width="24%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;  border-bottom: 3px solid #eeeeee;">
                                  Unit Price
                              </th>
                              <th width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;  border-bottom: 3px solid #eeeeee;">
                                Total Price
                            </th>
                                  </tr>
                                </thead>
                                <tbody id="productRows">
                                  ${confirmOrderHTML}
                                </tbody>
                              </table>
                                  
                          </td>
                      </tr>
                      <tr>
                          <td align="left" style="padding-top: 20px;">
                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                          SUB TOTAL
                                      </td>
                                      <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                      ₹ ${totalCartAmount}
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
                  
                  </td>
              </tr>
               <tr>
                  <td align="center" height="100%" valign="top"  style=" background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0"  style="max-width:660px;">
                            <tr>
                                <td align="center" valign="top" style="font-size:0;">
                                    <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; ">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"  style="max-width:300px;">
                                            <tr>
                                                <td align="center" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                    <p style="font-weight: 800;">Delivery Address</p>
                                                    <p>${streetAddress}<br>${nearByAddress}<br>${cityName}, ${stateName}<br>${country}, ${areaPincode}</p>

                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                    </table>
                  </td>
              </tr>
              <tr>
                  <td align="center" style="background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0; border-top: 3px solid #eeeeee;">
                                <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                    UrbanCart 🛒<br>1231 Street, Modal Gram<br>Ludhiana, Punjab-141002
                                </p>
                            </td>
                        </tr>
                    </table>
                  </td>
              </tr>
          </table>
          </td>
      </tr>
  </table>
  </body>
  </html>
      `;
};
