export default function LogList({ logs, activity }) {
  const filteredLogs = logs.filter(log => log.activity === activity);

  return (
    <ul>
      {filteredLogs.map((log, index) => (
        <li key={index}>
          <strong>{new Date(log.date).toLocaleString()}:</strong> {log.text}
        </li>
      ))}
    </ul>
  );
}
