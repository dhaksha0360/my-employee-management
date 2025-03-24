'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from 'react-bootstrap';

const ViewEmployeePage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;  // Handle string or string[]

  const [employee, setEmployee] = useState<any | null>(null);
  const [employeeIndex, setEmployeeIndex] = useState<number | null>(null); // Store index of employee

  useEffect(() => {
    if (id) {
      const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      const employee = storedEmployees.find((emp: any) => emp.id === parseInt(id));
      setEmployee(employee);

      // Find the index of the employee in the array for sequential ID
      const index = storedEmployees.findIndex((emp: any) => emp.id === parseInt(id));
      setEmployeeIndex(index);
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">View Employee</h1>
      {employee ? (
        <div>
          <p><strong>ID:</strong> {employeeIndex !== null ? employeeIndex + 1 : ''}</p> {/* Display sequential ID */}
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
          <p><strong>Age:</strong> {employee.age}</p>
          <Button variant="primary" href="/employees">Back to Employees</Button>
        </div>
      ) : (
        <p>Employee not found.</p>
      )}
    </div>
  );
};

export default ViewEmployeePage;