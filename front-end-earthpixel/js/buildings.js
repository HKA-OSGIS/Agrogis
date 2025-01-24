import axios from 'axios';
import { MAP_MAIN, URL_API, URL_GEOSERVER } from './settings';


// export function insert(){
//     let descripcion=document.getElementById('form-buildings-descripcion').value;
//     let geomWkt=document.getElementById('form-buildings-geomWkt').value;

//     // Verificar si la descripción está vacía
//     if (!descripcion.trim()) {
//         alert("La descripción no puede estar vacía.");
//         return;
//     }
//     axios.post(URL_API + '/plots/building_insert/',
//     {descripcion:descripcion,geomWkt:geomWkt}, {withCredentials: true})
//     .then(function (response) {
//     // handle success
//             console.log(response);
//             document.getElementById("form-buildings-gid").value=response.data.data[0].gid;
//             document.getElementById("form-buildings-area").value=response.data.data[0].area;
//             document.getElementById("form-buildings-message").innerHTML=response.data.message;
//             clearVectorBuildingsLayer()
//             reloadWMSBuildingsLayer(); 
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//             document.getElementById("form-buildings-message").innerHTML=error.message;
//         })
//         .finally(function () {
//             // always executed
//             console.log('Finally')
//     });
// }
export function insert(){
    let descripcion = document.getElementById('form-buildings-descripcion').value;
    let geomWkt = document.getElementById('form-buildings-geomWkt').value;

    // Verificar si la descripción está vacía
    if (!descripcion.trim()) {
        alert("La descripción no puede estar vacía.");
        return;
    }
    let formData = new FormData();
    formData.append("descripcion", descripcion);
    formData.append("geomWkt", geomWkt);

    axios.post('http://localhost:8000/plots/building_insert/', formData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(function (response) {
        // handle success
                console.log(response);
                document.getElementById("form-buildings-gid").value=response.data.data[0].gid;
                document.getElementById("form-buildings-area").value=response.data.data[0].area;
                document.getElementById("form-buildings-message").innerHTML=response.data.message;
                clearVectorBuildingsLayer()
                reloadWMSBuildingsLayer(); 
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        console.log('Finally');
    });
}



// export function update() {
//     let gid = document.getElementById('form-buildings-gid').value;
//     let descripcion = document.getElementById('form-buildings-descripcion').value;
//     let geomWkt = document.getElementById('form-buildings-geomWkt').value;

//     axios.post('http://localhost:8000/plots/building_update/', {
//         gid: gid,
//         descripcion: descripcion,
//         geomWkt: geomWkt
//     }, { withCredentials: true })
//     .then(function (response) {
//         // handle success
//         console.log(response);
//         document.getElementById("form-buildings-message").innerHTML = response.data.message;
//     })
//     .catch(function (error) {
//         // handle error
//         console.error("Error updating building:", error);
//         document.getElementById("form-buildings-message").innerHTML = "Error updating building";
//     })
//     .finally(function () {
//         console.log('Update request completed');
//     });
// }

export function update() {
    let gid = document.getElementById('form-buildings-gid').value;
    let descripcion = document.getElementById('form-buildings-descripcion').value;
    let geomWkt = document.getElementById('form-buildings-geomWkt').value;


    let formData = new FormData();
    formData.append("gid", gid);
    formData.append("descripcion", descripcion);
    formData.append("geomWkt", geomWkt);

    axios.post('http://localhost:8000/plots/building_update/', formData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(function (response) {
        // Manejo de éxito
        console.log(response);
        document.getElementById("form-buildings-message").innerHTML = response.data.message;
        clearVectorBuildingsLayer();
        reloadWMSBuildingsLayer();
    })
    .catch(function (error) {
        // Manejo de error
        console.log(error);
        document.getElementById("form-buildings-message").innerHTML = "Error al actualizar el edificio.";
    })
    .finally(function () {
        console.log('Finally');
    });
}


export function remove(){
    let gid = document.getElementById('form-buildings-gid').value;

    axios.post('http://localhost:8000/plots/building_delete/', 
    new URLSearchParams({ gid: gid }),
    { withCredentials: true })
    .then(function (response) {
        console.log(response.data);
        document.getElementById("form-buildings-message").innerHTML = response.data.message;
    })
    .catch(function (error) {
        console.log(error);
        document.getElementById("form-buildings-message").innerHTML = "Error deleting building";
    })
    .finally(function () {
        console.log('Delete request completed');
    });
}


export function select() {
    let gid = document.getElementById('form-buildings-gid').value;

    axios.get(`http://localhost:8000/plots/building_select/${gid}/`, 
    { withCredentials: true })
    .then(function (response) {
        console.log(response.data); // Ver la estructura en la consola

        if (response.data.ok && response.data.data.length > 0) {
            let building = response.data.data[0];  // Extrae el primer array dentro de data

            // Si los datos están en forma de array [gid, descripcion, geomWkt, area]
            document.getElementById("form-buildings-gid").value = building[0] ?? 'N/A';
            document.getElementById("form-buildings-descripcion").value = building[1] ?? 'N/A';
            document.getElementById("form-buildings-area").value = building[2] ?? 'N/A';
            document.getElementById("form-buildings-geomWkt").value = building[3] ?? 'N/A';

            document.getElementById("form-buildings-message").innerHTML = response.data.message;
        } else {
            document.getElementById("form-buildings-message").innerHTML = "No data found.";
        }
    })
    .catch(function (error) {
        console.error("Error fetching building:", error);
        document.getElementById("form-buildings-message").innerHTML = "Error selecting building";
    })
    .finally(function () {
        console.log('Select request completed');
    });
}





export function startDrawingBuilding(){
    //Enables de draw interaction
    MAP_MAIN.startDrawingBuilding();
    document.getElementById("map-message").innerHTML="Draw poligon interaction ACTIVE"
}

export function stopDrawingBuilding(){
    //Enables de draw interaction
    MAP_MAIN.stopDrawingBuilding();
    document.getElementById("map-message").innerHTML="Draw poligon interaction INACTIVE"
}

export function reloadWMSBuildingsLayer(){
    MAP_MAIN.reloadWMSBuildingsLayer();
    document.getElementById("map-message").innerHTML="WMS buildings reloaded"
}

export function clearVectorBuildingsLayer(){
    MAP_MAIN.clearVectorBuildingsLayer();
    document.getElementById("map-message").innerHTML="Vector buildings layer cleared"
}