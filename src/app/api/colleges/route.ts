// pages/api/colleges/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db'; 
import { NextResponse } from 'next/server';



// This should be a default export:
// data is in a json format like {collegeName: "string"}
export async function POST(req: Request, res: Response) {
    console.log(req.method)
  
    try {
    console.log(req.body)
      const  collegeName  = await req.json();
      console.log('collegeName:', collegeName)
      const createdCollege = await db.colleges.create({
        data:  collegeName,
    });
      return Response.json(createdCollege,{status: 201});
    } catch (error) {
      console.error('Error creating college:', error);
      return Response.json({ error: "internal server error"},{status: 500 });
    }
}