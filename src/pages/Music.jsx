import React, { useState } from "react";
import { CustomTable } from "../components/table/CustomTable";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Textfield } from "../components/TextField";
import { CustomButtons } from "../components/CustomButtons";

import {
  useCreateData,
  useFetchData,
  useDeleteData,
  useUpdateData,
} from "../hooks/useCustomHooks";
import { baseUrl } from "../api/BaseUrl";
import { useLocation } from "react-router-dom";

export const Music = () => {
  const location = useLocation();
  const receivedData = location.state || "";
  const { data: musics, setData } = useFetchData(
    `${baseUrl}music/get`,
    receivedData["artistId"]
  );
  const { createData } = useCreateData(`${baseUrl}music/add/`);
  const { deleteData } = useDeleteData(`${baseUrl}music/delete`);
  const { updateData } = useUpdateData(`${baseUrl}music/update/`);

  const colDefs = [
    { field: "title", headerName: "Title" },
    { field: "album_name", headerName: "Album Name" },
    { field: "genre", headerName: "Genre" },
    { field: "Action" },
  ];

  const rowData =
    musics !== null
      ? musics.map((music) => ({
          id: music.id,
          artist_name: music.artist_name,
          artist_id: music.artist_id,
          title: music.title,
          album_name: music.album_name,
          genre: music.genre,
        }))
      : [];

  const [editData, setEditData] = useState(null);

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    album_name: Yup.string().required("Required"),
    genre: Yup.string().required("Required"),
  });

  const initialValues = {
    artist_name: "",
    title: "",
    album_name: "",
    genre: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (editData !== null) {
      await updateData(values, setData);
      await setEditData(null);
      resetForm();
    } else {
      await createData(
        { artist_id: receivedData["artistId"], ...values },
        setData
      );
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
            <h1 className="text-4xl font-bold">Music</h1>
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
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    required
                    className="w-full"
                  />

                  <Textfield
                    label="Album Name"
                    name="album_name"
                    required={true}
                    className="col-span-2 w-full"
                    value={formik.values.album_name}
                    onChange={formik.handleChange}
                  />
                  <div className="flex flex-col w-full">
                    <div>
                      <label
                        htmlFor="Genre"
                        className="font-semibold text-gray-700 mb-1"
                      >
                        Genre
                      </label>
                      <span className="text-errorColor">*</span>
                    </div>
                    <Field
                      as="select"
                      name="genre"
                      className="border-2 border-primary p-2"
                    >
                      <option value="">Select Genre</option>
                      <option value="rnb">Rnb</option>
                      <option value="country">Country</option>
                      <option value="classic">Classic</option>
                      <option value="rock">Rock</option>
                      <option value="jazz">Jazz</option>
                    </Field>
                    <ErrorMessage
                      name="genre"
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
