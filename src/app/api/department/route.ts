// pages/api/colleges/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db'; 
import { NextResponse } from 'next/server';



// This should be a default export:
// data is in a json format like {collegeName: "string"}
export async function POST(req: Request, res: Response) {
    try {
      // Parse the JSON body
      const { collegeName, department } = await req.json();
      console.log('collegeName:', collegeName, 'departmentName:', department);

      // Fetch the college ID based on the college name
      const college = await db.colleges.findUniqueOrThrow({
        where: {
          collegeName,
        },
      });
      console.log('college:', college);
    if (!college) {
        return Response.json({ error: 'College not found' },{status: 404});
    }
    if(!department){
        return Response.json({ error: 'Department not found' },{status: 404});
    }
        const collegeId = college.id;
        console.log('collegeId:', collegeId);
        console.log('department:', department)

        const createdDepartment = await db.departments.create({
            data: { 
                collegeId,
                department
                
            },
        });
        return Response.json(createdDepartment,{status: 201});
    } catch (error) {
        console.error('Error creating college:', error);
        return Response.json({ error: "internal server error"},{status: 500 });
    }
}