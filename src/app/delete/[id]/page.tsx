'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const DeleteEmployeePage = () => {
  const [employee, setEmployee] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const employeeData: { [key: number]: { id: number; name: string; role: string } } = {
        1: { id: 1, name: 'John Doe', role: 'Software Engineer' },
        2: { id: 2, name: 'Jane Smith', role: 'Product Manager' },
        3: { id: 3, name: 'Mark Johnson', role: 'Designer' },
      };
      // Ensure id is treated as a number
      const employeeId = Number(id);
      setEmployee(employeeData[employeeId]);
    }
  }, [id]);

  const handleDelete = () => {
    alert('Employee Deleted');
    router.push('/employees');
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Delete Employee</h1>
      <div className="alert alert-danger" role="alert">
        Are you sure you want to delete employee <strong>{employee.name}</strong>?
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      <button className="btn btn-secondary ms-2" onClick={() => router.push('/employees')}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteEmployeePage;