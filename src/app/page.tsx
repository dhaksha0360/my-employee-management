'use client';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container mt-5">
      {/* Header Section */}
      <header className="text-center mb-5">
        <h1 className="display-4 text-primary mb-3">Welcome to Employee Management System</h1>
        <p className="lead text-muted">
          This system allows you to manage employee data efficiently. You can view the list of employees and their details.
        </p>
      </header>

      {/* Main Content Section */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg mb-4">
            <div className="card-body text-center">
              <h4 className="card-title">Manage Your Employees with Ease</h4>
              <p className="card-text">
                Efficiently manage employee information, track progress, and more with our user-friendly interface.
              </p>
              <Link href="/employees" className="btn btn-primary">
                View Employees List
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-center mt-5 mb-4">
        <p className="text-muted">&copy; 2025 Employee Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;