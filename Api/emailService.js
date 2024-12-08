const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html) => {
  try {
    // Create a transporter using your email service (Gmail in this case)
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can replace this with any other email provider
      auth: {
        user: 'sunainavirdi.5341@gmail.com',  // Your email address
        pass: 'tkkd pknp wxob htyn',   // Your email password or app-specific password
      },
    });

    // Email message setup
    const mailOptions = {
      from: 'sunainavirdi.5341@gmail.com', // Sender's email address
      to,                          // Recipient's email address
      subject,                     // Subject of the email
      text,                        // Plain text body of the email
      html,                        // HTML body of the email (optional)
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

module.exports = sendEmail;
