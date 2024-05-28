async function apiGetNick(contactId) {
    try {
        const response = await fetch('/api/get-user-nick', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contactId })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.nick) {
                console.log('User Nick:', data.nick);
            
            } else if (data.contactId) {
                console.log('User Id:', data.contactId);
            }
        } else {
            console.error('Error al obtener el nick del usuario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export {
    apiGetNick
}