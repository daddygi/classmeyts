"use client";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import React, { useState, useTransition, useEffect } from "react";
import {
  TextField,
  Select,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUpSchema } from "../../../../schemas";
import FormError from "@/components/Form-error";
import FormSuccess from "@/components/Form-success";
import { useCurrentUser } from "@/hooks/use-current-user";

function ProfilePage() {
  type FormData = z.infer<typeof signUpSchema>;
  const [college, setCollege] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      studentNumber: "",
      college: "",
      department: "",
      yearLevel: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    setSuccess("");
    startTransition(() => {});
  };

  const collegeList = [
    {
      key: 1,
      value: "College of Architecture",
    },
    {
      key: 2,
      value: "College of Business Administration",
    },
    {
      key: 3,
      value: "College of Engineering",
    },
    {
      key: 4,
      value: "College of Law",
    },
    {
      key: 5,
      value: "College of Education & Liberal Arts",
    },
    {
      key: 6,
      value: "College of Nursing",
    },
    {
      key: 7,
      value: "College of Pharmacy",
    },
    {
      key: 8,
      value: "College of Science",
    },
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
  return (
    <div className="h-full flex">
      <div className="xl:w-20 xl:h-full ">
        <Sidebar />
      </div>
      <div className="p-12 w-full">
        <PageTitle title="Profile" />
        <div className="flex justify-center items-center gap-10 pt-5">
          <div className="flex flex-col bg-white w-[805px] h-[752px] p-8 items-center gap-4 rounded-lg ">
            <Image
              src="/account_circle.png"
              alt="display image"
              width={80}
              height={80}
            />
            <p className="text-important">
              <span>Level 1</span>/<span>Rank Member</span>
            </p>
            <form
              className="flex flex-col justify-center items-center gap-6 p-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-2 justify-center items-center w-[572px]">
                <TextField
                  hiddenLabel
                  label="First Name"
                  variant="standard"
                  className="w-1/2"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  disabled={isPending}
                />
                <TextField
                  label="Last Name"
                  variant="standard"
                  className="w-1/2"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  disabled={isPending}
                />
              </div>
              <TextField
                label="Username"
                variant="standard"
                className="w-[572px]"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                disabled={isPending}
              />
              <TextField
                label="Email"
                variant="standard"
                className="w-[572px]"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isPending}
              />
              <TextField
                label="Student Number"
                variant="standard"
                className="w-[572px]"
                {...register("studentNumber")}
                error={!!errors.studentNumber}
                helperText={errors.studentNumber?.message}
                disabled={isPending}
              />
              <div className="flex gap justify-center items-center w-[572px]">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    College
                  </InputLabel>
                  <Select
                    label="College"
                    {...register("college")}
                    onChange={(e: any) => setCollege(e.target.value)}
                    disabled={isPending}
                  >
                    {collegeList.map((college) => (
                      <MenuItem key={college.key} value={college.value}>
                        {college.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Department
                  </InputLabel>
                  <Select
                    {...register("department")}
                    label="Department"
                    disabled={isPending}
                  >
                    {college === "College of Architecture" && (
                      <MenuItem value="Architecture">Architecture</MenuItem>
                    )}
                    {college === "College of Business Administration" &&
                      COBA.map((dept) => (
                        <MenuItem key={dept.key} value={dept.value}>
                          {dept.value}
                        </MenuItem>
                      ))}
                    {college === "College of Engineering" &&
                      COE.map((dept) => (
                        <MenuItem key={dept.key} value={dept.value}>
                          {dept.value}
                        </MenuItem>
                      ))}
                    {college === "College of Law" && (
                      <MenuItem value="Juris Doctor">Juris Doctor</MenuItem>
                    )}
                    {college === "College of Education & Liberal Arts" &&
                      COELA.map((dept) => (
                        <MenuItem key={dept.key} value={dept.value}>
                          {dept.value}
                        </MenuItem>
                      ))}
                    {college === "College of Nursing" && (
                      <MenuItem value="Nursing">Nursing</MenuItem>
                    )}
                    {college === "College of Pharmacy" && (
                      <MenuItem value="Pharmacy">Pharmacy</MenuItem>
                    )}
                    {college === "College of Science" &&
                      COS.map((dept) => (
                        <MenuItem key={dept.key} value={dept.value}>
                          {dept.value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Year Level
                  </InputLabel>
                  <Select
                    label="Year Level"
                    {...register("yearLevel")}
                    disabled={isPending}
                  >
                    <MenuItem value="First Year">First Year</MenuItem>
                    <MenuItem value="Second Year">Second Year</MenuItem>
                    <MenuItem value="Third Year">Third Year</MenuItem>
                    <MenuItem value="Fourth Year">Fourth Year</MenuItem>
                    <MenuItem value="Fifth Year">Fifth Year</MenuItem>
                    <MenuItem value="Irregular">Irregular</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                <Button
                  variant="contained"
                  className="w-[486px] bg-secondary-color-blue text-white mt-10"
                  type="submit"
                >
                  Update Profile
                </Button>

                <div className="">
                  <FormError message={error} />
                  <FormSuccess message={success} />
                </div>
              </div>
            </form>
          </div>
          <div className="flex-col">
            <div className="flex flex-col bg-white w-[415px] h-[360px] p-8 items-center mb-7 rounded-lg">
              Gamification
            </div>
            <div className="flex flex-col bg-white w-[415px] h-[360px] p-8 items-center  rounded-lg">
              Settings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
