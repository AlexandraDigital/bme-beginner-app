import React from "react";

interface Props {
  completedLessons: string[];
}

const Dashboard = ({ completedLessons }: Props) => (
  <div className="card">
    <h2 className="text-2xl font-semibold mb-2">📊 Progress</h2>
    {completedLessons.length === 0 && <p>No lessons completed yet</p>}
    {completedLessons.map((l, i) => (<div key={i}>✅ {l}</div>))}
  </div>
);

export default Dashboard;
