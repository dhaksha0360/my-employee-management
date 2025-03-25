'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button, Alert } from 'react-bootstrap';

const ViewEmployeePage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;  // Handle string or string[]

  const [employee, setEmployee] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
          const response = await fetch(`https://dummy.restapiexample.com/api/v1/employee/${id}`);
          const data = await response.json();

          if (response.ok && data.status === 'success') {
            setEmployee(data.data);
          } else {
            throw new Error('Employee not found');
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployeeData();
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">View Employee</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        employee && (
          <div>
            <p><strong>ID:</strong> {employee.id}</p>
            <p><strong>Name:</strong> {employee.employee_name}</p>
            <p><strong>Salary:</strong> {employee.employee_salary}</p>
            <p><strong>Age:</strong> {employee.employee_age}</p>
            <Button variant="primary" href="/employees">Back to Employees</Button>
          </div>
        )
      )}
    </div>
  );
};

export default ViewEmployeePage;