import { useState } from 'react'
// Importing React components
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'
import LogForm from './components/LogForm'
import LogList from './components/LogList'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [logs, setLogs] = useState([]);

  // Line below is the original Vite + React template code
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <h1>Progress Buddy</h1>
        <ActivityForm  setActivities={setActivities} />
        <ActivityList activities={activities} on={setSelectedActivity} />
        {selectedActivity && (
          <>
            <LogForm activity={selectedActivity} setLogs={setLogs} />
            <LogList logs={logs} />
          </>
        )}
      </div>
    </>
  );
}

export default App
