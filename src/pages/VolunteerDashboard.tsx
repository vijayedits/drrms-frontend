import React, { useEffect, useState } from 'react';
import './VolunteerDashboard.css';

type Request = {
  request_id: number;
  citizen: string;
  location: string;
  resource: string;
  quantity_requested: number;
  status: string;
  remarks: string;
};

type Resource = {
  id: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  location: string;
};

const VolunteerDashboard = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const volunteerId = 2; // dummy for now

  useEffect(() => {
    fetch('http://localhost:3000/volunteers/requests')
      .then(res => res.json())
      .then(data => setRequests(data));

    fetch('http://localhost:3000/volunteers/resources')
      .then(res => res.json())
      .then(data => setResources(data));
  }, []);

  const handleAssign = async (requestId: number) => {
    await fetch('http://localhost:3000/volunteers/assign-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volunteer_id: volunteerId, request_id: requestId }),
    });
    alert('You are assigned to the task!');
  };

  const handleUpdateStatus = async (requestId: number) => {
    await fetch('http://localhost:3000/volunteers/update-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request_id: requestId, new_status: 'fulfilled', volunteer_id: volunteerId }),
    });
    alert('Task marked as fulfilled!');
  };

  return (
    <div className="volunteer-dashboard">
      <h1>Volunteer Dashboard</h1>

      <h2>🆘 Help Requests</h2>
      {requests.map((r) => (
        <div className="card" key={r.request_id}>
          <p><strong>Citizen:</strong> {r.citizen}</p>
          <p><strong>Location:</strong> {r.location}</p>
          <p><strong>Resource:</strong> {r.resource} ({r.quantity_requested})</p>
          <p><strong>Status:</strong> {r.status}</p>
          <p><strong>Remarks:</strong> {r.remarks}</p>
          <button onClick={() => handleAssign(r.request_id)}>Assign</button>
          <button onClick={() => handleUpdateStatus(r.request_id)}>Mark Fulfilled</button>
        </div>
      ))}

      <h2>📦 Available Resources</h2>
      {resources.map((res) => (
        <div className="card" key={res.id}>
          <p><strong>Name:</strong> {res.name}</p>
          <p><strong>Type:</strong> {res.type}</p>
          <p><strong>Qty:</strong> {res.quantity} {res.unit}</p>
          <p><strong>Location:</strong> {res.location}</p>
        </div>
      ))}
    </div>
  );
};

export default VolunteerDashboard;
