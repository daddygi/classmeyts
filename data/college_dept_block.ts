import db from "@/utils/db";

export const get_all_college_blocks = async () => {
  try {
    const res = await db.colleges.findMany();
    return res || [];
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return [];
  }
};

export const get_all_department_blocks = async () => {
  try {
    const res = await db.departments.findMany();

    return res;
  } catch (error) {
    console.error("error fetching departments", error);
    return [];
  }
};
