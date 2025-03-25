'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Table, Alert, Spinner } from 'react-bootstrap';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://dummy.restapiexample.com/api/v1/employees');

        const text = await response.text();
        console.log(text); // For debugging purposes

        // Try to parse the response as JSON
        const result = JSON.parse(text);

        if (response.ok && result.status === 'success') {
          setEmployees(result.data);
        } else {
          throw new Error('Failed to fetch employees');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = (id: number) => {
    const updatedEmployees = employees.filter((employee: any) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Employees</h1>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
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
                  <td>{employee.employee_name}</td>
                  <td>{employee.employee_salary}</td>
                  <td>{employee.employee_age}</td>
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
        </>
      )}
    </div>
  );
};

export default EmployeesPage;