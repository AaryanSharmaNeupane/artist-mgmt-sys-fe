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
import { useNavigate } from "react-router";
import { CSVLink } from "react-csv";
export const Artist = () => {
  const { data: artists, setData } = useFetchData(`${baseUrl}artist/get/`);
  const { createData } = useCreateData(`${baseUrl}artist/add/`);
  const { deleteData } = useDeleteData(`${baseUrl}artist/delete`);
  const { updateData } = useUpdateData(`${baseUrl}artist/update/`);
  const navigate = useNavigate();

  const colDefs = [
    { field: "name", headerName: "Name" },
    { field: "dob", headerName: "Date of Birth" },
    { field: "gender", headerName: "Gender" },
    { field: "address", headerName: "Address" },
    { field: "first_release_year", headerName: "First Release Year" },
    { field: "no_of_albums_released", headerName: "Number of Albums Released" },
    { field: "Action" },
  ];

  const rowData =
    artists !== null
      ? artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
          dob: artist.dob,
          gender: artist.gender,
          address: artist.address,
          first_release_year: artist.first_release_year,
          no_of_albums_released: artist.no_of_albums_released,
        }))
      : [];

  const [editData, setEditData] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    no_of_albums_released: Yup.number()
      .typeError("Must be a valid number")
      .integer("Must be an integer")
      .min(0, "Must be a non-negative number")
      .required("Required"),
    first_release_year: Yup.number()
      .typeError("Must be a valid year")
      .integer("Must be an integer")
      .min(1900, "Year must be at least 1900")
      .max(2100, "Year must be at most 2100")
      .required("Required"),
  });

  const initialValues = {
    name: "",
    dob: "",
    gender: "",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
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
            <h1 className="text-4xl font-bold">Artist</h1>
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
                    label="Name"
                    name="name"
                    value={formik.values.name}
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
                      <option value="others">Others</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <Textfield
                    label="First Release Year"
                    name="first_release_year"
                    number={true}
                    value={formik.values.first_release_year}
                    onChange={formik.handleChange}
                    required
                    className="w-full"
                  />
                  <Textfield
                    label="No. of Albums Released"
                    name="no_of_albums_released"
                    number={true}
                    value={formik.values.no_of_albums_released}
                    onChange={formik.handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between gap-x-4 pt-4">
                  <CustomButtons name={editData !== null ? "Update" : "Save"} />
                  {artists !== null && artists.length > 0 && (
                    <CSVLink
                      data={artists}
                      filename={"artists.csv"}
                      className="bg-primary text-txtprimary px-4 py-2 h-[44px]"
                    >
                      Download
                    </CSVLink>
                  )}
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
              onViewClick={(row) => {
                navigate("/artist/music", { state: { artistId: row } });
              }}
              showViewButton={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
