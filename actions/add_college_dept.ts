"use server";
import * as z from "zod";
import { signUpSchema } from "../schemas";
import bcrypt from "bcryptjs";
import db from "@/utils/db";
import { getUserByEmail, getUserStudentNumber } from "../data/users";
import { generateVerificationTOken } from "@/utils/tokens";
import { sendVerificationEmail } from "@/utils/mail";

const collegeList = [
  { name: "College of Architecture", id: 1 },
  { name: "College of Business Administration", id: 2 },
  { name: "College of Engineering", id: 3 },
  { name: "College of Law", id: 4 },
  { name: "College of Education & Liberal Arts", id: 5 },
  { name: "College of Nursing", id: 6 },
  { name: "College of Pharmacy", id: 7 },
  { name: "College of Science", id: 8},
];
const COBA = [
    {
      key: 1,
      value: "Accountancy",
    },
    {
      key: 2,
      value: "Business Administration",
    },
    {
      key: 3,
      value: "Customs Administration",
    },
    {
      key: 4,
      value: "Hospitality Management",
    },
  ];

  const COE = [
    {
      key: 1,
      value: "Chemical Engineering",
    },
    {
      key: 2,
      value: "Chemical Process Technology",
    },
    {
      key: 3,
      value: "Civil Engineering",
    },
    {
      key: 4,
      value: "Computer Engineering",
    },
    {
      key: 5,
      value: "Electrical Engineering",
    },
    {
      key: 6,
      value: "Electronics Engineering",
    },
    {
      key: 7,
      value: "Industrial Engineering",
    },
    {
      key: 8,
      value: "Mechanical Engineering",
    },
    {
      key: 9,
      value: "Mining Engineering",
    },
    {
      key: 10,
      value: "Geology",
    },
    {
      key: 11,
      value: "Petroleum Engineering",
    },
  ];

  const COELA = [
    {
      key: 1,
      value: "Elementary Education",
    },
    {
      key: 2,
      value: "Secondary Education",
    },
    {
      key: 3,
      value: "Special Needs Education",
    },
    {
      key: 4,
      value: "Physical Education",
    },
    {
      key: 5,
      value: "Political Science",
    },
    {
      key: 6,
      value: "Philosophy",
    },
    {
      key: 7,
      value: "Communication",
    },
  ];

  const COS = [
    {
      key: 1,
      value: "Biology",
    },
    {
      key: 2,
      value: "Chemistry",
    },
    {
      key: 3,
      value: "Computer Science",
    },
    {
      key: 4,
      value: "Information System",
    },
    {
      key: 5,
      value: "Information Technology",
    },
    {
      key: 6,
      value: "Psychology",
    },
  ];
const departments = [
  ...COBA.map(dept => ({ department: dept.value, college_id: 2 })),  
  ...COE.map(dept => ({ department: dept.value, college_id: 3 })),   
  ...COELA.map(dept => ({ department: dept.value, college_id: 5 })), 
  ...COS.map(dept => ({ department: dept.value, college_id: 8 }))   
];



// export const addCollegeDept = async () => {
//     try {
//       // colleges
//       const collegeResults = await db.college.createMany({ data: collegeList });
//       console.log(`Inserted ${collegeResults.count} colleges`);
  
//       //departments
//       const departmentResults = await db.department.createMany({ data: departments });
//       console.log(`Inserted ${departmentResults.count} departments`);
//     } catch (error) {
//       console.error('Error inserting data:', error);
//     }
//   };

// addCollegeDept();