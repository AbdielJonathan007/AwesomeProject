export default function ActivityList({ activities, onSelect, selectedActivity }) {
  if (activities.length === 0) {
    return (
      <div className="bg-gray-800/80 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Your Goals</h2>
        <p className="text-gray-300">No goals created yet. Create your first SMART goal!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/80 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Your Goals</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedActivity?.id === activity.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-100'
            }`}
            onClick={() => onSelect(activity)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{activity.name}</h3>
                {activity.description && (
                  <p className="text-sm opacity-80 mt-1">{activity.description}</p>
                )}
                <div className="mt-2 text-xs opacity-70">
                  <div>Target: {activity.measurable}</div>
                  <div>Due: {new Date(activity.timebound).toLocaleDateString()}</div>
                  {activity.buddy_email && (
                    <div>Buddy: {activity.buddy_email}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                {activity.completed && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    ✓ Completed
                  </span>
                )}
                <span className="text-xs opacity-60">
                  Created: {new Date(activity.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
