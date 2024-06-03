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
