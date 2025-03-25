// /src/app/delete/[id]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Use useParams from next/navigation
import { Alert, Button } from 'react-bootstrap';

const DeleteEmployeePage = () => {
  const [employee, setEmployee] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic id from the URL

  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
          // Fetch employee data based on the dynamic 'id'
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

  const handleDelete = async () => {
    try {
      // Call the delete API to delete the employee
      const response = await fetch(`https://dummy.restapiexample.com/api/v1/delete/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        alert('Employee successfully deleted');
        router.push('/employees'); // Redirect back to the employee list
      } else {
        throw new Error('Failed to delete employee');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-5">
      <h1>Delete Employee</h1>
      <div className="alert alert-danger" role="alert">
        Are you sure you want to delete employee <strong>{employee.name}</strong>?
      </div>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="secondary" className="ms-2" onClick={() => router.push('/employees')}>
        Cancel
      </Button>
    </div>
  );
};

export default DeleteEmployeePage;