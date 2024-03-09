import axios from "axios";
export const baseUrl = "http://localhost:4000/";

export const getApi = async (url) => {
  const data = await axios
    .get(`${baseUrl}${url}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { status: "Failed", error: err };
    });
  return data;
};

export const postApi = async (url, formData) => {
  const data = await axios
    .post(`${baseUrl}${url}`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { status: "Failed", error: err };
    });
  return data;
};

export const putApi = async (url, formData) => {
  const data = await axios
    .put(`${baseUrl}${url}`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { status: "Failed", error: err };
    });
  return data;
};
