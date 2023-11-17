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

export async function modifyUser(URL, body) {
    try {
        let respuesta = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: (body)
        })
        if (!respuesta.ok) {
            throw new Error("Error en la edicion del usuario.");
        }
        return await respuesta.text();
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
            throw new Error("Error en la eliminación del usuario.");
        }
        return await respuesta.text();
    } catch (err) {
        throw err;
    }
}