import axios from "axios";

const API_URL = "https://run.mocky.io/v3/1274a1ee-2e09-4162-a555-bcb955956426";

export const getSketches = async () => {
  return axios.get(API_URL).then((response) => {
    const { data } = response;
    return data;
  });
};

export const getUsers = async () => {
  return axios.get(API_URL).then((response) => {
    const { data } = response;
    return data;
  });
};

export const getCurrentUser = () => {
  return axios.get("").then((response) => {
    const { data } = response;
    return "Luis";
  });
};

export const saveSketch = async ({ sketch }: any) => {
  return axios.post(API_URL, { sketch }).then((response) => {
    const { data } = response;
    return data;
  });
};
