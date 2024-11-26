import axios from  "axios"
import { backendUrl } from "./utils"


const axiosInstance=axios.create({
    baseURL:backendUrl
})

export default axiosInstance