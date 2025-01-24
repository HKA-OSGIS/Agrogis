import axios from 'axios';

const BASE_URL = 'http://localhost:8000/plots/';

export function insert(){
    let descripcion=document.getElementById('form-buildings-descripcion').value;
    let geomWkt=document.getElementById('form-buildings-geomWkt').value;

    axios.post('http://localhost:8000/plots/building_insert/',
    {descripcion:descripcion,geomWkt:geomWkt}, {withCredentials: true})
    .then(function (response) {
    // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
            console.log('Finally')
    });
}

// Delete function
export function remove(){
    let gid = document.getElementById('form-buildings-gid').value;

    axios.post(BASE_URL + 'building_delete/', {
        data: { gid: gid }, 
        withCredentials: true 
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        console.log('Finally');
    });
}

// Update function
export function update(){
    let gid = document.getElementById('form-buildings-gid').value;
    let descripcion = document.getElementById('form-buildings-descripcion').value;
    let geomWkt = document.getElementById('form-buildings-geomWkt').value;

    axios.put(BASE_URL + 'building_update/', 
    { gid: gid, descripcion: descripcion, geomWkt: geomWkt }, 
    { withCredentials: true })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        console.log('Finally');
    });
}

// Select function
export function select(){
    let gid = document.getElementById('form-buildings-gid').value;

    axios.get(BASE_URL + 'building_select_by_gid/', {
        params: { gid: gid }, 
        withCredentials: true 
    })
    .then(function (response) {
        if (response.data.data.length > 0){
            document.getElementById("form-buildings-gid").value = response.data.data[0].gid;
            document.getElementById("form-buildings-descripcion").value = response.data.data[0].descripcion;
            document.getElementById("form-buildings-geomWkt").value = response.data.data[0].st_astext;
        } else {
            document.getElementById("form-buildings-descripcion").value = "";
            document.getElementById("form-buildings-geomWkt").value = "";
        }
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        console.log('Finally');
    });
}