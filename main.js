//Simple Chained Promises Example

const axios = require("axios");
const BASE_URL = "http://localhost:5000";
const constellationsUrl = `${BASE_URL}/constellations`;

const bootes = {
    name: "Bootes",
    meaning: "Herdsman",
    starsWithPlanets: 5,
    quadrant: "NQ3",
};

axios.get(constellationsUrl).then(({ data }) => {
    console.log(data);
    return axios.post(constellationsUrl, bootes);
}).then(({ data }) => console.log(data));



//Complex Chained promises example
const axios = require("axios");
const BASE_URL = "http://localhost:5000";
const constellationsUrl = `${BASE_URL}/constellations`;

const bootes = {
    name: "Bootes",
    meaning: "Herdsman",
    starsWithPlanets: 5,
    quadrant: "NQ3",
};

axios.get(constellationsUrl).then(({ data }) => {
    //console.log(data.data);
    return data.find(({ name }) => name === bootes.name);  //This returns true if this name already exists in our 'database'
})
    .then((exists) => {       // 'exists' holds the true or false value returned above
        if (exists) throw `Constellation "${bootes.name}" already exists.`;
        return axios.post(constellationsUrl, bootes)
            .then(({ data }) => console.log(data));
    })
    .catch(console.log);


//Promise.all Example
function getConstellations(ids) {
    const promises = ids.map((id) => {
        const url = `${BASE_URL}/constellations/${id}`;
        return axios.get(url);
    });

    return Promise.all(promises);
}

const ids = ["KGQIwSq", "32TN5F8"];
getConstellations(ids).then(console.log);



// Async/Await example
const axios = require("axios");
const BASE_URL = "http://localhost:5000";
const constellationsUrl = `${BASE_URL}/constellations`;

async function getConstellationNameById(id) {
    const url = `${BASE_URL}/constellations/${id}`;
    try {
        const { data } = await axios.get(url);

        console.log(data.name);
        return data.name;
    } catch (error) {
        throw `Constellation with id of ${id} could not be found.`;
    }
}


getConstellationNameById("n2OEOzp").then(console.log);
//> "Libra"
getConstellationNameById("32TN5F8").then(console.log);
//Draco
getConstellationNameById("error").then(console.log).catch(console.log);