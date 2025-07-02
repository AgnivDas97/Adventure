import React, { useState } from 'react';
import '../style/service.css';

const initialServices = [
  {
    id: 1,
    name: "Website Development",
    createdBy: "Admin",
    createdAt: "2024-05-01",
    issue: "Responsive Design"
  },
  {
    id: 2,
    name: "SEO Optimization",
    createdBy: "John Doe",
    createdAt: "2024-05-10",
    issue: "Ranking Improvement"
  },
  {
    id: 3,
    name: "Cloud Hosting",
    createdBy: "Jane Smith",
    createdAt: "2024-05-15",
    issue: "Downtime Issue"
  }
];

const Service = () => {

   const [services, setServices] = useState(initialServices);
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setServices(services.filter(service => service.id !== id));
    setSelected(selected.filter(sid => sid !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit service with id: ${id}`);
    // Implement edit logic/modal as needed
  };


  return (
    <div>
      {/* make list of services, which are provided by the company, can be deleted, can be editedal,check boxes for selectiono multiple, created date, created by,issue name. */}
      <div className="service-page">
      <h1>Services Provided</h1>
      <table className="service-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === services.length && services.length > 0}
                onChange={e => {
                  if (e.target.checked) {
                    setSelected(services.map(s => s.id));
                  } else {
                    setSelected([]);
                  }
                }}
              />
            </th>
            <th>Service Name</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Issues</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(service.id)}
                  onChange={() => handleSelect(service.id)}
                />
              </td>
              <td>{service.name}</td>
              <td>{service.createdBy}</td>
              <td>{service.createdAt}</td>
              <td>{service.issue}</td>
              <td>
                <button onClick={() => handleEdit(service.id)}>Edit</button>
                <button onClick={() => handleDelete(service.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Service
