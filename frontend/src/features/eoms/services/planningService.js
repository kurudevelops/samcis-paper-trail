import axios from "axios";

export async function getPlanningDocuments() {

  let data = [];
  try {
    const res = await axios.get("http://localhost:8000/api/v1/documents/all-documents");
    data = res.data;
  } catch(err) {
    console.error(err);
  }
  return data;
}