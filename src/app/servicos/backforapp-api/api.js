import axios from "axios";

export const api = axios.create({
    baseURL: "https://parseapi.back4app.com",
    headers: {
        "X-Parse-Application-Id": "K9uPsRuFvBzLDEaaPDwuxrxtxY94dZPDLmuwRaEm",
        "X-Parse-REST-API-Key": "PoqZ54BGlFJnpJ1wTuvxSJ4gDvh2TbwjrxeeNrmN",
        "X-Parse-Revocable-Session": 1
    }
})