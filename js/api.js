const url = 'http://localhost:3000/registros';

// Agregando un nuevo cliente a la API
export const nuevoRegistro = async (cliente) => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// Obteniendo todos los clientes de la API
export const obtenerRegistros = async () => {
    try {
        const respuesta = await fetch(url);
        const cliente = await respuesta.json();

        return cliente;
    } catch (error) {
        console.log(error);
    }
}

// Elimar un cliente de la API
export const eliminarRegistro = async (clienteId) => {
    try {
        await fetch(`${url}/${clienteId}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}

// Obtener un cliente por su ID
export const obtenerRegistrosPorId = async (id) => {
    try {
        const respuesta = await fetch(`${url}/${id}`);
        const clienteID = await respuesta.json()

        return clienteID;
    } catch (error) {
        console.log(error);
    }
}

// Editar un cliente de la API
export const editarCliente = async (cliente) => {
    console.log(cliente);
    try {
        await fetch(`${url}/${cliente.id}`,{
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-type': 'application/json' 
            }
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
}