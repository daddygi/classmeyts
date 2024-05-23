// components/CreateCDTemplate.tsx
"use client";

import React, { useState, FormEvent } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { createCollege, createDepartments } from '../../../../actions/add_college_dept'; 

interface College {
  id: string;
  collegeName: string | number;
}

function CreateCDTemplate() {
  const [collegeName, setCollegeName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
        if (departmentName.trim() !== '') {
            const departmentResponse = await fetch('/api/department', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"department":departmentName, "collegeName":collegeName}),
            });
              
            if (!departmentResponse.ok) {
                throw new Error(`Department creation failed: ${departmentResponse.statusText}`);
            }
        }else{
            const collegeResponse = await fetch('/api/colleges', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"collegeName":collegeName }),
            });
              
          
            if (!collegeResponse.ok) {
              throw new Error(`College creation failed: ${collegeResponse.statusText}`);
            }
    
            const collegeData = await collegeResponse.json();
            const collegeId = collegeData.id; 
        }
        
        // 1. Create College
        

    // 2. Create Department (if provided)


    setSuccessMessage(
        departmentName.trim() !== ''
            ? 'College and department created successfully'
            : 'College created successfully'
    );

    } catch (error: any) {
      setError(error.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
      setCollegeName('');
      setDepartmentName('');
    }
  };

  return (
    <form className="mb-8 bg-white p-6 rounded-xl w-[400px]" onSubmit={handleSubmit}>
      <TextField
        id="college-name"
        label="College Name"
        placeholder="Enter college name"
        variant="filled"
        className="w-full p-4 mb-2 border rounded text-gray"
        value={collegeName}
        onChange={(e) => setCollegeName(e.target.value)}
        required 
      />

      <TextField
        id="department-name"
        label="Department Name (Optional)" 
        placeholder="Enter department name"
        variant="filled"
        className="w-full p-4 mb-2 border rounded text-gray"
        value={departmentName}
        onChange={(e) => setDepartmentName(e.target.value)}
      />

      <div className="flex justify-between items-center mt-2">
        <Button
          className="p-2 mr-2 border rounded hover:bg-page-background"
          type="button" 
          onClick={() => { 
            // Handle cancel (e.g., reset form fields)
            setCollegeName('');
            setDepartmentName('');
            setError(null);
            setSuccessMessage(null);
          }} 
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="p-2 bg-secondary-color-blue text-white rounded hover:bg-sign-in-first-color"
          disabled={isLoading} 
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add'} 
        </Button>
      </div>

      <div className="mt-2">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
    </form>
  );
}

export default CreateCDTemplate;