import React, { useState, useEffect } from "react";
import { CustomTable } from "../components/table/CustomTable";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Textfield } from "../components/TextField";
import { CustomButtons } from "../components/CustomButtons";
import { DateField } from "../components/DateField";
import {
  useCreateData,
  useFetchData,
  useDeleteData,
  useUpdateData,
} from "../hooks/useCustomHooks";
import { baseUrl } from "../api/BaseUrl";
export const Users = () => {
  const { data: users, setData } = useFetchData(`${baseUrl}users/get/`);
  const { createData } = useCreateData(`${baseUrl}users/add/`);
  const { deleteData } = useDeleteData(`${baseUrl}users/delete`);
  const { updateData } = useUpdateData(`${baseUrl}users/update/`);

  const colDefs = [
    { field: "fname", headerName: "First Name" },
    { field: "lname", headerName: "Last Name" },
    { field: "gender", headerName: "Gender" },
    { field: "email", headerName: "Email" },
    { field: "phone", headerName: "Phone" },
    { field: "dob", headerName: "Date of Birth" },
    { field: "address", headerName: "Address" },
    { field: "Action" },
  ];

  const rowData =
    users !== null
      ? users.map((user) => ({
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          gender: user.gender,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
          address: user.address,
        }))
      : [];

  const [editData, setEditData] = useState(null);

  const validationSchema = Yup.object({
    fname: Yup.string().required("Required"),
    lname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email"),
    phone: Yup.string()
      .required("Required")
      .matches(/^[0-9]{10}$/, "Invalid"),
    gender: Yup.string().required("Required"),
  });

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    gender: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (editData !== null) {
      await updateData(values, setData);
      await setEditData(null);
      resetForm();
    } else {
      await createData(values, setData);
      resetForm();
    }
  };

  const handleDelete = async (row) => {
    await deleteData(row, setData);
  };

  return (
    <section>
      <div className="container mx-auto">
        <div className="px-8 py-4">
          <div className="pb-4">
            <h1 className="text-4xl font-bold">User</h1>
          </div>
          <Formik
            initialValues={editData || initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <div className="grid grid-cols-4 gap-6 w-3/4 mb-6">
                  <Textfield
                    label="First Name"
                    name="fname"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    required
                    className="w-full"
                  />
                  <Textfield
                    label="Last Name"
                    name="lname"
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    required
                    className="w-full"
                  />
                  <Textfield
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="w-full"
                  />
                  <Textfield
                    label="Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    required
                    className="w-full"
                  />
                  <DateField
                    name="dob"
                    label="Date of Birth"
                    className="w-full"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                  />
                  <Textfield
                    label="Address"
                    name="address"
                    className="col-span-2 w-full"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                  <div className="flex flex-col w-full">
                    <div>
                      <label
                        htmlFor="gender"
                        className="font-semibold text-gray-700 mb-1"
                      >
                        Gender
                      </label>
                      <span className="text-errorColor">*</span>
                    </div>
                    <Field
                      as="select"
                      name="gender"
                      className="border-2 border-primary p-2"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-x-4 pt-4">
                  <CustomButtons name={editData !== null ? "Update" : "Save"} />
                </div>
              </Form>
            )}
          </Formik>
          <div className="pt-4">
            <CustomTable
              columnDefs={colDefs}
              rowData={rowData}
              onEditClick={(row) => {
                setEditData(row);
              }}
              onDeleteClick={(row) => {
                handleDelete(row);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
