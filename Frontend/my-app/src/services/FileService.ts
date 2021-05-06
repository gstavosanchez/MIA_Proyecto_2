import axios from "axios";
import yaml from "js-yaml";

const API = "http://localhost:4000/api";
export const uploadFile = async (dataStr: string) => {
  var newJSON = {};
  try {
    const data = yaml.load(dataStr);
    newJSON = JSON.stringify(data);
    const res =  await setJSON(newJSON)
    console.log(res)
  } catch (error) {
    console.log(error);
  }
};

const setJSON = async (jsonData:any) => {
  return await axios.post(`${API}/cargamasiva`, jsonData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
