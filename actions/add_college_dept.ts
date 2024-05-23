import * as z from "zod";
import db from "@/utils/db"; // Assuming you have a connection to your database here
import { createCollegeSchema, createDepartmentSchema } from "../schemas";

type CollegeFormData = z.infer<typeof createCollegeSchema>;
type DepartmentFormData = z.infer<typeof createDepartmentSchema>;

export const createCollege = async (values: CollegeFormData) => {
  const validatedFields = createCollegeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid College Name" };
  }

  const { collegeName } = validatedFields.data;

  try {
    const createdCollege = await db.colleges.create({
      data: {
        collegeName,
      },
    });

    return { success: "College created successfully", data: createdCollege };
  } catch (error) {
    console.error("Error creating college:", error);
    return { error: "Error creating college" };
  }
};

export const createDepartments = async (
  collegeId: string, // Make collegeId a string to match the MongoDB ObjectId
  departments: DepartmentFormData[]
) => {
  try {
    const college = await db.colleges.findUnique({
      where: {
        id: collegeId,
      },
    });

    if (!college) {
      return { error: "College not found" };
    }

    const departmentPromises = departments.map(async (dept) => {
      const validatedFields = createDepartmentSchema.safeParse(dept);

      if (!validatedFields.success) {
        throw new Error("Invalid Department Fields");
      }

      const { departmentName } = validatedFields.data;

      await db.departments.create({
        data: {
          collegeId, // Use the collegeId fetched from the database
          departmentName,
        },
      });
    });

    await Promise.all(departmentPromises);

    return { success: "Departments created successfully" };
  } catch (error) {
    console.error("Error creating departments:", error);
    return { error: "Error creating departments" };
  }
};
