import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default API;
export const saveStudent = (data) => API.post("/students", data);
export const getAllStudents = () => API.get("/students");
export const getStudent = (id) => API.get(`/students/${id}`);
export const deleteStudent = (id) => API.delete(`/students/${id}`);