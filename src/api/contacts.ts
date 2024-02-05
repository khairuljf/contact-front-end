import React from 'react'
import axios from 'axios' 
import env from 'react-dotenv'
export default axios.create({
    baseURL:`${env.JSON_SERVER_URL}:${env.JSON_SERVER_PORT}/` 
    // baseURL:`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/` 
})