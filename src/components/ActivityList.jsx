export default function ActivityList({ activities, onSelect }) {
  return (
    <div>
      <h2>Your Activities</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={activity.id}>
            <button onClick={() => onSelect(activity)}>
              {activity.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
