import { useState } from 'react';

export default function ActivityForm({ setActivities }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [specific, setSpecific] = useState('');
  const [measurable, setMeasurable] = useState('');
  const [achievable, setAchievable] = useState('');
  const [relevant, setRelevant] = useState('');
  const [timebound, setTimebound] = useState('');
  const [buddyEmail, setBuddyEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = {
      id: Date.now(),
      name,
      description,
      specific,
      measurable,
      achievable,
      relevant, //Why it matters
      timebound,
      buddyEmail, // Accountability partner email
      steps:[],
      completed: false
    };
    setActivities(prev => [...prev, newActivity]);
    setName('');
    setDescription('');
    setSpecific('');
    setMeasurable('');
    setAchievable('');
    setRelevant('');
    setTimebound('');
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h2 className="text-4xl font-bold mb-6">Add1 New SMART Goal</h2>

      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <label>Goal Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-3">
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Briefly describe your goal"
        />
      </div>

      <div className="mb-3">
        <label>Specific:</label>
        <input 
          type="text" 
          value={specific} 
          onChange={e => setSpecific(e.target.value)} 
          placeholder="What exactly do you want to accomplish?"
          required
        />
      </div>

      <div className="mb-3">
        <label>Measurable:</label>
        <input 
          type="text" 
          value={measurable} 
          onChange={e => setMeasurable(e.target.value)} 
          placeholder="How will you track progress?"
          required
        />
      </div>

      <div className="mb-3">
        <label>Achievable:</label>
        <input 
          type="text" 
          value={achievable} 
          onChange={e => setAchievable(e.target.value)} 
          placeholder="Is this realistic given your resources?"
        />
      </div>

      <div className="mb-3">
        <label>Relevant (Why this matters):</label>
        <input 
          type="text" 
          value={relevant} 
          onChange={e => setRelevant(e.target.value)} 
          placeholder="Why is this important to you?"
        />
      </div>

      <div className="mb-3">
        <label>Completion Date:</label>
        <input 
          type="date" 
          value={timebound} 
          onChange={e => setTimebound(e.target.value)} 
          required
        />
      </div>

      <div className="mb-3">
        <label>Accountability Partner Email:</label>
        <input 
          type="email" 
          value={buddyEmail} 
          onChange={e => setBuddyEmail(e.target.value)} 
          placeholder="Enter a friend's email"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Goal
      </button>
    </form>
  );
}