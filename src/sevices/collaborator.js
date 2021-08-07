import encryptData from "../utils/encrypt";
import axios from "axios";
import axiosInstance from "./interceptor";

const protocol = "https://";

const host = "api.grupokonecta.pe/clubkonecta";
const resource = "v2";

async function loginUser() {
  console.log("in login function");
  try {
    const API_URL = `${protocol}${host}/${resource}/user/login`;
    const dataEncrypt = {
      username: encryptData(process.env.VUE_APP_DEV_USER),
      password: encryptData(process.env.VUE_APP_DEV_PASSWORD),
    };
    const response = await axios.post(API_URL, dataEncrypt);
    console.log("response", response);
    localStorage.setItem("token", response.data.data.access_token);
    // return findDoctorRol(response.data.data.roles);
  } catch (error) {
    console.log("error", error);
    throw new Error(error.response.data.data.message);
  }
}


async function postDataColaborador(documento) {
  loginUser();
  try {
    const API_URL = `${protocol}${host}/${resource}/perfil/consulta-colaborador`;
    const data = {
      "documento": documento
    } 
    console.log(data)
    const response = await axiosInstance.post(API_URL, data);
    return response.data.data;
  } catch (error) {
    switch (error.response.status) {
      case 401:
        throw new Error("Logout");
      default:
        throw new Error(error.response.data.data.message);
    }
  }
}

export { loginUser, postDataColaborador };
