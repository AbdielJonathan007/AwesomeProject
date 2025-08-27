export default function LogForm({selectedActivity, setLogs}){
    const [logEntry, setLogEntry] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!logEntry.trim()) return;

    const newLog = {
      activity: selectedActivity,
      text: logEntry.trim(),
      date: new Date().toISOString(),
    };

    setLogs(prev => [...prev, newLog]);
    setLogEntry('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What did you do?"
        value={logEntry}
        onChange={(e) => setLogEntry(e.target.value)}
      />
      <button type="submit">Add Log</button>
    </form>
  );
}