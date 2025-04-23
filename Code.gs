// Function to authenticate user (username and password check)
function checkLogin(username, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');  // Ensure 'Users' is the correct sheet name
  const data = sheet.getDataRange().getValues();
  
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === username && data[i][1] === password) {
      return true;  // User found and authenticated
    }
  }
  return false;  // Invalid username or password
}

// Fetch courses from the 'Courses' sheet
function getProductsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Courses');  // Ensure 'Courses' is the correct sheet name
  const data = sheet.getDataRange().getValues();
  const products = [];
  
  for (let i = 1; i < data.length; i++) {
    const product = {
      id: data[i][0],  // Course ID (e.g., "course1")
      name: data[i][1],  // Course Name (e.g., "Course 1")
      description: data[i][2],  // Description
      price: data[i][3],  // Price (e.g., "300")
    };
    products.push(product);
  }
  return products;
}

// Generate the PromptPay QR Code
function generatePaymentQR(courseId, price) {
  // Replace with your actual PromptPay phone number or ID
  const promptPayPhoneNumber = "0812345678";  // CHANGE THIS TO YOUR PROMPTPAY NUMBER
  
  // Create the PromptPay link (you can use other payment systems as well)
  const paymentLink = `promptpay://${promptPayPhoneNumber}?amount=${price}`;
  
  // Generate the QR code
  const qrCode = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(paymentLink)}`;
  
  return qrCode;
}

// Redirect to YouTube after successful payment
function redirectToYouTube(courseId) {
  const youtubeLinks = {
    "course1": "https://www.youtube.com/watch?v=XYZ123",  // Replace with your actual YouTube video URL for course1
    "course2": "https://www.youtube.com/watch?v=ABC456",  // Replace with your actual YouTube video URL for course2
  };
  
  return youtubeLinks[courseId] || "https://www.youtube.com";  // Default to YouTube if course is not found
}
