import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useFetchData = (url, id = null) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          params: id ? { id } : {},
        });

        setData(response.data.data);
      } catch (error) {
        toast.error("Error fetching data: " + error.message);
      }
    };
    fetchData();
  }, [url, id]);

  return { data, setData };
};

export const useCreateData = (url) => {
  const createData = async (newData, setData) => {
    try {
      const response = await axios.post(url, newData);
      if (response.data.status === 200) {
        toast.success("Data created successfully");
        setData((prevData) => [
          { id: response.data.data.id, ...newData },
          ...(prevData || []),
        ]);
      } else {
        toast.error(response.data.errorMessage);
      }
    } catch (error) {
      toast.error("Error creating data: " + error.message);
      throw error;
    }
  };

  return { createData };
};

export const useDeleteData = (url) => {
  const deleteData = async (id, setData) => {
    try {
      await axios.delete(url, { params: { id } });
      toast.success("Data deleted successfully");
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Error deleting data: " + error.message);
      throw error;
    }
  };

  return { deleteData };
};

export const useUpdateData = (url) => {
  const updateData = async (updatedData, setData) => {
    try {
      const response = await axios.put(`${url}`, updatedData);
      if (response.data.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id == response.data.data.id ? response.data.data : item
          )
        );
        toast.success("Data updated successfully");
      } else {
        toast.error(response.data.errorMessage);
      }
      return response.data.data;
    } catch (error) {
      toast.error("Error updating data: " + error.message);
      throw error;
    }
  };

  return { updateData };
};
