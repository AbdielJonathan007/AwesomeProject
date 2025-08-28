import express from 'express';
import nodemailer from 'nodemailer';
import { Database } from '../database.js';

const router = express.Router();
const db = new Database();
await db.init();

// Configure email transporter (using Gmail as example)
// In production, you'd want to use environment variables for credentials
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use app-specific password for Gmail
    }
  });
};

// Send achievement notification
router.post('/achievement', async (req, res) => {
  try {
    const { activity_id, message } = req.body;

    if (!activity_id) {
      return res.status(400).json({ error: 'Activity ID is required' });
    }

    // Get activity with buddy email
    const activity = await db.get('SELECT * FROM activities WHERE id = ?', [activity_id]);
    
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    if (!activity.buddy_email) {
      return res.status(400).json({ error: 'No accountability partner email set for this activity' });
    }

    // Get recent logs for context
    const recentLogs = await db.all(`
      SELECT * FROM logs 
      WHERE activity_id = ? 
      ORDER BY created_at DESC 
      LIMIT 5
    `, [activity_id]);

    const transporter = createTransporter();

    const emailContent = `
      <h2>🎉 Progress Update from your accountability partner!</h2>
      <p><strong>Activity:</strong> ${activity.name}</p>
      <p><strong>Goal:</strong> ${activity.specific}</p>
      
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      
      <h3>Recent Progress:</h3>
      <ul>
        ${recentLogs.map(log => `
          <li>${new Date(log.created_at).toLocaleDateString()}: ${log.text}</li>
        `).join('')}
      </ul>
      
      <p>Keep up the great work! 💪</p>
      
      <small>This notification was sent from Progress Buddy</small>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: activity.buddy_email,
      subject: `Progress Update: ${activity.name}`,
      html: emailContent
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Notification sent successfully',
      sent_to: activity.buddy_email 
    });

  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ 
      error: 'Failed to send notification',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Send goal completion notification
router.post('/goal-completed', async (req, res) => {
  try {
    const { activity_id } = req.body;

    if (!activity_id) {
      return res.status(400).json({ error: 'Activity ID is required' });
    }

    const activity = await db.get('SELECT * FROM activities WHERE id = ?', [activity_id]);
    
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    if (!activity.buddy_email) {
      return res.status(400).json({ error: 'No accountability partner email set for this activity' });
    }

    // Get total logs count
    const logStats = await db.get(`
      SELECT 
        COUNT(*) as total_logs,
        DATE(MIN(created_at)) as started_date,
        DATE(MAX(created_at)) as completed_date
      FROM logs 
      WHERE activity_id = ?
    `, [activity_id]);

    const transporter = createTransporter();

    const emailContent = `
      <h2>🎯 GOAL ACHIEVED! 🎉</h2>
      <p>Your accountability partner has completed their goal!</p>
      
      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>${activity.name}</h3>
        <p><strong>Goal:</strong> ${activity.specific}</p>
        <p><strong>Target:</strong> ${activity.measurable}</p>
        <p><strong>Deadline:</strong> ${new Date(activity.timebound).toLocaleDateString()}</p>
      </div>
      
      <h3>Achievement Stats:</h3>
      <ul>
        <li><strong>Total Log Entries:</strong> ${logStats.total_logs}</li>
        <li><strong>Started:</strong> ${new Date(logStats.started_date).toLocaleDateString()}</li>
        <li><strong>Completed:</strong> ${new Date(logStats.completed_date).toLocaleDateString()}</li>
      </ul>
      
      <p>🎊 Congratulations to your accountability partner on this achievement! Consider sending them a congratulatory message!</p>
      
      <small>This notification was sent from Progress Buddy</small>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: activity.buddy_email,
      subject: `🎯 Goal Achieved: ${activity.name}`,
      html: emailContent
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Goal completion notification sent successfully',
      sent_to: activity.buddy_email 
    });

  } catch (error) {
    console.error('Error sending goal completion notification:', error);
    res.status(500).json({ 
      error: 'Failed to send notification',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Send weekly progress summary
router.post('/weekly-summary', async (req, res) => {
  try {
    const { activity_id } = req.body;

    if (!activity_id) {
      return res.status(400).json({ error: 'Activity ID is required' });
    }

    const activity = await db.get('SELECT * FROM activities WHERE id = ?', [activity_id]);
    
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    if (!activity.buddy_email) {
      return res.status(400).json({ error: 'No accountability partner email set for this activity' });
    }

    // Get logs from the last 7 days
    const weeklyLogs = await db.all(`
      SELECT * FROM logs 
      WHERE activity_id = ? 
      AND created_at >= datetime('now', '-7 days')
      ORDER BY created_at DESC
    `, [activity_id]);

    const transporter = createTransporter();

    const emailContent = `
      <h2>📊 Weekly Progress Summary</h2>
      <p>Here's how your accountability partner did this week:</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>${activity.name}</h3>
        <p><strong>This Week's Activity:</strong> ${weeklyLogs.length} log entries</p>
      </div>
      
      ${weeklyLogs.length > 0 ? `
        <h3>This Week's Progress:</h3>
        <ul>
          ${weeklyLogs.map(log => `
            <li>${new Date(log.created_at).toLocaleDateString()}: ${log.text}</li>
          `).join('')}
        </ul>
      ` : '<p>No activity logged this week. Maybe reach out and offer some encouragement! 💪</p>'}
      
      <small>This weekly summary was sent from Progress Buddy</small>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: activity.buddy_email,
      subject: `Weekly Summary: ${activity.name}`,
      html: emailContent
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Weekly summary sent successfully',
      sent_to: activity.buddy_email,
      logs_this_week: weeklyLogs.length
    });

  } catch (error) {
    console.error('Error sending weekly summary:', error);
    res.status(500).json({ 
      error: 'Failed to send weekly summary',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;