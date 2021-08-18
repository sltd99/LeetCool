import axios from "axios"

const url = process.env.BACKEND_URL

export function useAxios() {
  return axios.create({
    baseURL: url,
  })
}
