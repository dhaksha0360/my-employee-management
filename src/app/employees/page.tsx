'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Table } from 'react-bootstrap';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    // Fetch employees from localStorage on client-side
    if (typeof window !== 'undefined') {
      const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      setEmployees(storedEmployees);
    }
  }, []);

  const handleDelete = (id: number) => {
    const updatedEmployees = employees.filter((employee: any) => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Employees</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: any) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.salary}</td>
              <td>{employee.age}</td>
              <td>
                <Link href={`/employee/${employee.id}`} className="btn btn-info btn-sm me-2">
                  View
                </Link>
                <Link href={`/update/${employee.id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(employee.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link href="/create" className="btn btn-primary">Create Employee</Link>
    </div>
  );
};

export default EmployeesPage;