export async function createUser(URL, body) {
    try {
        let respuesta = await fetch(URL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: (body)
        })
        if (!respuesta.ok) {
            throw new Error("Error en la creacion del usuario");
        }
        return await respuesta.text();
    } catch (err) {
        throw err;
    }
}

export function modifyUser(URL, body) {
    try {
        return fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: (body)
        }).then((response) => {
            if (!response.ok){
                throw new Error(response);
            }
            return response;
        }).catch(error => {
            return error;
        })
        
    } catch (err) {
        throw err;
    }
}

export async function deleteUser(URL, body) {
    try {
        let respuesta = await fetch(URL, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: (body)
        })
        if (!respuesta.ok) {
            throw new Error(await respuesta.text());
        }
        return await respuesta.text();
    } catch (err) {
        throw err;
    }
}