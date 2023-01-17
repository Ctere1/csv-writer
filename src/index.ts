import axios from "axios";
import { createObjectCsvWriter } from 'csv-writer'

const URL = 'https://api.publicapis.org/entries';

const AxiosInstance = axios.create();
const cswWriter = createObjectCsvWriter({
    path: "./output.csv",
    header: [
        { id: "name", title: "Name" },
        { id: "desc", title: "Description" },
        { id: "category", title: "Category" },
        { id: "link", title: "Link" },
    ]
})

interface apiData {
    name: string;
    desc: string;
    category: string;
    link: string;
}

AxiosInstance.get(URL).then((response) => {
    const APIs: apiData[] = [];
    //console.log(response.data)

    response.data.entries.forEach(async (elem) => {
        const name = elem.API;
        const desc = elem.Description;
        const category = elem.Category;
        const link = elem.Link;
        APIs.push({
            name,
            desc,
            category,
            link,
        });
    });

    cswWriter.writeRecords(APIs).then(() => {
        console.log("Written to file")
    })
}).catch(err => {
    console.log(err)
});

