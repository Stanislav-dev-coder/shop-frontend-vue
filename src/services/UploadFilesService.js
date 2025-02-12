import axios from "axios";

const API_URL = 'http://localhost:8080/catego/';

class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return axios.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    getFiles() {
        return axios.get("/files");
    }
}

export default new UploadFilesService();