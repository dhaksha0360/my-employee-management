'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Button } from 'react-bootstrap';

const UpdateEmployeePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;  // Handle string or string[]

  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');
  const [employeeIndex, setEmployeeIndex] = useState<number | null>(null); // Store index of employee

  useEffect(() => {
    if (id) {
      const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      const employee = storedEmployees.find((emp: any) => emp.id === parseInt(id));

      if (employee) {
        setName(employee.name);
        setSalary(employee.salary);
        setAge(employee.age);

        // Find the index of the employee in the array for sequential ID
        const index = storedEmployees.findIndex((emp: any) => emp.id === parseInt(id));
        setEmployeeIndex(index);
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      let storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      storedEmployees = storedEmployees.map((emp: any) =>
        emp.id === parseInt(id) ? { ...emp, name, salary, age } : emp
      );

      localStorage.setItem('employees', JSON.stringify(storedEmployees));
      router.push('/employees');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" value={employeeIndex !== null ? employeeIndex + 1 : ''} disabled /> {/* Display sequential ID */}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control type="text" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control type="text" value={age} onChange={(e) => setAge(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default UpdateEmployeePage;