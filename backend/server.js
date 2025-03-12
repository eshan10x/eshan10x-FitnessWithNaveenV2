const express = require('express');
const multer = require('multer');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// API endpoint to handle form submission
app.post('/api/submit-application', upload.fields([
  { name: 'frontView', maxCount: 1 },
  { name: 'sideView', maxCount: 1 },
  { name: 'backView', maxCount: 1 }
]), async (req, res) => {
  try {
    const formData = JSON.parse(req.body.formData);
    
    // Prepare email content
    const emailContent = `
      <h1>New Fitness Application Submission</h1>
      
      <h2>Personal Information</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Date of Birth:</strong> ${formData.dob}</p>
      <p><strong>Gender:</strong> ${formData.gender}</p>
      <p><strong>Mobile:</strong> ${formData.mobile}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      
      <h2>Body Metrics</h2>
      <p><strong>Weight:</strong> ${formData.weight} kg</p>
      <p><strong>Height:</strong> ${formData.height} cm</p>
      <p><strong>BMI:</strong> ${formData.bmi} (${getBmiCategory(formData.bmi)})</p>
      
      <h2>Fitness Goals</h2>
      <p><strong>Purpose of Joining:</strong> ${formData.purpose}</p>
      <p><strong>Interested Program:</strong> ${formData.program}</p>
      
      <h2>Health Screening</h2>
      <p><strong>Heart Condition:</strong> ${formData.heartCondition}</p>
      <p><strong>Heart Condition:</strong> ${formData.chestPain}</p>
      <p><strong>Heart Condition:</strong> ${formData.looseBalance}</p>
      <p><strong>Heart Condition:</strong> ${formData.brokenBone}</p>
      <p><strong>Activity Level:</strong> ${formData.activityLevel}</p>
    `;
    
    // Prepare email attachments
    const attachments = [];
    
    if (req.files) {
      Object.keys(req.files).forEach(key => {
        if (req.files[key] && req.files[key][0]) {
          attachments.push({
            filename: req.files[key][0].originalname,
            path: req.files[key][0].path
          });
        }
      });
    }
    
    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Fitness Application: ${formData.name}`,
      html: emailContent,
      attachments
    };
    
    await transporter.sendMail(mailOptions);
    
    // Optional: Send confirmation email to applicant
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Application Received - Fitness With Naveen',
      html: `
        <h1>Thank you for applying to Fitness With Naveen!</h1>
        <p>Dear ${formData.name},</p>
        <p>We have received your application and our team will review it shortly. We'll contact you soon to discuss the next steps in your fitness journey.</p>
        <p>If you have any questions in the meantime, please don't hesitate to reach out to us at ${process.env.ADMIN_EMAIL} or call us at (+94) 76 687 6602.</p>
        <p>Best regards,<br>The Fitness With Naveen Team</p>
      `
    };
    
    await transporter.sendMail(userMailOptions);
    
    // Cleanup uploaded files after sending email
    if (req.files) {
      Object.keys(req.files).forEach(key => {
        if (req.files[key] && req.files[key][0]) {
          fs.unlinkSync(req.files[key][0].path);
        }
      });
    }
    
    res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application' });
  }
});

// Helper function to get BMI category
function getBmiCategory(bmi) {
  const numBmi = parseFloat(bmi);
  if (!numBmi) return "";
  if (numBmi < 18.5) return "Underweight";
  if (numBmi < 25) return "Normal";
  if (numBmi < 30) return "Overweight";
  return "Obese";
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});