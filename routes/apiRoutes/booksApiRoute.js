
const router = require('express').Router()
   
const fetch = require("node-fetch");

const url = "https://www.googleapis.com/books/v1/volumes?q=javascript";

const get_data = async url => {
  try {
    const response = await fetch(url);
     const json = await response.json();
     console.log(json);
    
  } catch (error) {
    console.log(error);
  }
};

get_data(url);


