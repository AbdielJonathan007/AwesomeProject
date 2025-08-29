# Progress Buddy 🎯

A comprehensive full-stack web application that transforms goal setting through SMART methodology, real-time progress tracking, and built-in accountability partnerships. Turn your aspirations into achievements with systematic tracking and automated partner notifications.

## 🚀 What is Progress Buddy?

Progress Buddy addresses the 92% goal abandonment rate by providing a structured, accountable approach to personal development. It combines proven SMART goal methodology with modern web technology to create a complete ecosystem for achieving meaningful objectives.

**Key Innovation:** Unlike generic goal-tracking apps, Progress Buddy integrates social accountability directly into the workflow, making goal abandonment significantly harder through automated partner engagement.

## 🎯 Problems It Solves

### 1. **Vague Goal Setting**
- **Problem**: People set unclear goals like "get fit" or "learn coding"
- **Solution**: Forces SMART goal methodology (Specific, Measurable, Achievable, Relevant, Time-bound)

### 2. **Lack of Progress Tracking**
- **Problem**: No systematic way to log and visualize progress over time
- **Solution**: Structured logging system with timestamps and metrics

### 3. **Accountability Gap**
- **Problem**: Goals are private, making it easy to quit without consequences
- **Solution**: Built-in accountability partner system with email notifications

### 4. **Progress Invisibility**
- **Problem**: Small daily progress feels insignificant and unmotivating
- **Solution**: Visual progress tracking and achievement notifications

### 5. **Goal Abandonment**
- **Problem**: 92% of people abandon their goals within the first year
- **Solution**: External accountability and progress visibility increase completion rates

## 🏗️ Architecture

### Frontend (React + Vite)
```
src/
├── components/           # React components
│   ├── ActivityForm.jsx  # SMART goal creation form
│   ├── ActivityList.jsx  # Goal display and selection
│   ├── LogForm.jsx      # Progress logging interface
│   └── LogList.jsx      # Progress history display
├── services/
│   └── api.js           # API communication layer
└── App.jsx              # Main application component
```

### Backend (Node.js + Express)
```
server/
├── routes/              # API endpoints
│   ├── activities.js    # Goal CRUD operations
│   ├── logs.js         # Progress logging operations
│   └── notifications.js # Email notification system
├── database.js         # SQLite database layer
└── server.js           # Express server configuration
```

### Database Schema (SQLite)
```sql
activities (goals)
├── id (PRIMARY KEY)
├── name, description
├── specific, measurable, achievable, relevant, timebound (SMART criteria)
├── buddy_email (accountability partner)
└── completed, created_at, updated_at

logs (progress entries)
├── id (PRIMARY KEY)
├── activity_id (FOREIGN KEY)
├── text (progress description)
├── metrics (structured data)
└── created_at

goals (future feature)
├── id (PRIMARY KEY)
├── activity_id (FOREIGN KEY)
├── target_value, current_value
└── target_date, achieved
```

## 🛠️ Technical Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first styling framework
- **Fetch API** - HTTP client for backend communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite3** - Lightweight embedded database
- **Nodemailer** - Email sending service
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Nodemon** - Development server auto-restart

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Gmail account (for email notifications)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AwesomeProject
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Configure Environment Variables
```bash
cd server
cp .env.example .env
```

Edit the `.env` file with your email credentials:
```env
PORT=3001
NODE_ENV=development
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
DB_PATH=./data/progress_buddy.db
```

### 5. Run the Application

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
cd ..
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

## 📡 API Endpoints

### Activities (Goals)
```
GET    /api/activities           # Get all activities
GET    /api/activities/:id       # Get single activity with logs
POST   /api/activities           # Create new activity
PUT    /api/activities/:id       # Update activity
DELETE /api/activities/:id       # Delete activity
PATCH  /api/activities/:id/complete # Mark as completed
```

### Logs (Progress Entries)
```
GET    /api/logs                 # Get all logs (filterable by activity_id)
GET    /api/logs/:id             # Get single log
POST   /api/logs                 # Create log entry
PUT    /api/logs/:id             # Update log entry
DELETE /api/logs/:id             # Delete log entry
GET    /api/logs/activity/:id/stats # Get activity statistics
```

### Notifications (Accountability)
```
POST   /api/notifications/achievement     # Send progress notification
POST   /api/notifications/goal-completed  # Send goal completion alert
POST   /api/notifications/weekly-summary  # Send weekly progress summary
```

### Health Check
```
GET    /api/health               # Server status check
```

## 💡 Key Features

### 1. **SMART Goal Framework**
Forces users to define goals using proven methodology:
- **Specific**: Exact outcome desired
- **Measurable**: Quantifiable progress metrics
- **Achievable**: Realistic given resources
- **Relevant**: Personal importance and motivation
- **Time-bound**: Clear deadline

### 2. **Progress Logging System**
- Time-stamped entries with rich text descriptions
- Optional metrics for quantified tracking
- Historical progress visualization
- Activity-specific log filtering

### 3. **Accountability Partner Integration**
- Email notifications for achievements
- Goal completion celebrations
- Weekly progress summaries
- Partner engagement system

### 4. **Real-time Data Persistence**
- Automatic saving to SQLite database
- No data loss on browser refresh
- Cross-device synchronization potential

### 5. **Responsive Design**
- Mobile-first approach
- Tailwind CSS styling
- Dark theme with gradient backgrounds
- Intuitive user experience

## 🎨 User Experience Flow

1. **Goal Creation**: User fills SMART goal form with accountability partner email
2. **Goal Selection**: Choose active goal from visual goal list
3. **Progress Logging**: Record daily/weekly progress with descriptive text
4. **Automatic Notifications**: System emails partner about achievements
5. **Progress Review**: Visual timeline of all logged activities
6. **Goal Completion**: Mark goals complete and celebrate with partner

## 📊 Use Cases

### Personal Fitness
- **Goal**: "Complete 100 pushups daily for 30 days"
- **Logging**: Daily sets/reps tracking
- **Partner**: Workout buddy receives daily progress

### Skill Development
- **Goal**: "Solve 50 LeetCode problems in 2 months"
- **Logging**: Problems solved, difficulty, topics
- **Partner**: Study group member gets weekly summaries

### Habit Formation
- **Goal**: "Meditate 20 minutes daily for 60 days"
- **Logging**: Session duration, techniques, feelings
- **Partner**: Mindfulness buddy celebrates milestones

### Creative Projects
- **Goal**: "Write 50,000-word novel in November"
- **Logging**: Daily word count, chapters completed
- **Partner**: Writing group receives achievement updates

## 🔧 Development Features

### Error Handling
- Comprehensive try-catch blocks
- User-friendly error messages
- Fallback UI states
- Database connection recovery

### Data Validation
- Required field enforcement
- Email format validation
- Date range checking
- SQL injection prevention

### Performance Optimization
- Efficient database queries
- Lazy loading of components
- Optimized re-renders
- Minimal bundle size

## 🚧 Future Enhancements

### 1. **Analytics Dashboard**
- Progress charts and graphs
- Streak tracking
- Goal completion rates
- Time-based insights

### 2. **Social Features**
- Public goal sharing
- Community challenges
- Leaderboards
- Achievement badges

### 3. **Mobile Application**
- React Native implementation
- Push notifications
- Offline capability
- Camera integration for progress photos

### 4. **Advanced Notifications**
- SMS/WhatsApp integration
- Slack/Discord webhooks
- Custom notification schedules
- Reminder systems

### 5. **Goal Templates**
- Pre-built SMART goals
- Industry-specific templates
- Success rate statistics
- Best practice guidance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Acknowledgments

- SMART Goals methodology by George T. Doran
- Accountability research by Dr. Gail Matthews
- React and Node.js communities
- Contributors and beta testers

---

**Progress Buddy** - Turning aspirations into achievements, one logged entry at a time! 🎯✨
