'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Button, Alert } from 'react-bootstrap';

const UpdateEmployeePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // Handle string or string[]

  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the employee data based on the id
  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
          const response = await fetch(`https://dummy.restapiexample.com/api/v1/employee/${id}`);

          // Ensure the response is JSON
          const contentType = response.headers.get('Content-Type');
          if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text(); // Get raw text for inspection
            throw new Error(`Invalid response type. Response: ${textResponse}`);
          }

          const data = await response.json();

          if (response.ok && data.status === 'success') {
            setName(data.data.employee_name);
            setSalary(data.data.employee_salary);
            setAge(data.data.employee_age);
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure salary and age are valid numbers
    const parsedSalary = parseFloat(salary);
    const parsedAge = parseInt(age, 10);

    if (isNaN(parsedSalary) || isNaN(parsedAge)) {
      setError('Salary and Age must be valid numbers');
      return;
    }

    const updatedEmployee = {
      name,
      salary: parsedSalary,
      age: parsedAge,
    };

    try {
      const response = await fetch(`https://dummy.restapiexample.com/api/v1/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });

      // Ensure the response is JSON
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text(); // Get raw text to inspect
        throw new Error(`Invalid response type. Response: ${textResponse}`);
      }

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        router.push('/employees'); // Redirect to the employee list page
      } else {
        throw new Error('Failed to update employee');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Employee</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" value={id} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UpdateEmployeePage;