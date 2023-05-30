const URL = "https://fakerestapi.azurewebsites.net"

export const Actividades = async () => {
    const datos = await (await fetch(URL + "/api/v1/Activities", {
        method: "GET"
    })).json();
    console.log(datos);
    return datos;
}

export const ActividadId = async (id) => {
    const datos = await (await fetch(URL + "/api/v1/Activities/"+id, {
        method: "GET"
    })).json();
    console.log(datos);
    return datos;
}

export const GuardarActividad = async (data) => {
    const cabecera = {
        "Content-Type": "application/json",
    };
    const auxid = {
        "id": await ConseguirId()
    };
    Object.assign(data, auxid);

    const datos = await (await fetch(URL + "/api/v1/Activities", {
        method: "POST",
        headers: cabecera,
        body: JSON.stringify(data)
    })).json();
    console.log(datos);
    return datos;
}

export const ActualizarActividad = async (data) => {
    const cabecera = {
        "Content-Type": "application/json",
    };
    const datos = await (await fetch(URL + "/api/v1/Activities/"+data.id, {
        method: "PUT",
        headers: cabecera,
        body: JSON.stringify(data)
    })).json();
    console.log(datos);
    return datos;
}



export const ConseguirId = async () => {
    const datos = await (await fetch(URL + "/api/v1/Activities", {
        method: "GET"
    })).json();
    return datos.length + 1;
}