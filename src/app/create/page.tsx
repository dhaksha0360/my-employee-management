'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button } from 'react-bootstrap';

const CreateEmployeePage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve the last employee ID and increment it
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const newId = storedEmployees.length > 0 ? storedEmployees[storedEmployees.length - 1].id + 1 : 1;

    const newEmployee = {
      id: newId,
      name,
      salary,
      age,
    };

    localStorage.setItem('employees', JSON.stringify([...storedEmployees, newEmployee]));

    router.push('/employees');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control type="text" placeholder="Enter salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control type="text" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  );
};

export default CreateEmployeePage;