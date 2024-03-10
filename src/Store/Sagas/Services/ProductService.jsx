export async function addRecord(payload) {
    let response = await fetch("/product", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()

    // let response = await fetch("/product", {
    //     method: "POST",
    //     headers: {
    //         
    //     },
    //     body: payload
    // })
    // return await response.json()
}
export async function getRecord() {
    let response = await fetch("/product", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function updateRecord(payload) {
    let response = await fetch("/product/" + payload.id, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()

    // let response = await fetch("/product/" + payload.get('id'), {
    //     method: "PUT",
    //     headers: {

    //     },
    //     body: payload
    // })
    // return await response.json()
}
export async function deleteRecord(payload) {
    let response = await fetch("/product/" + payload.id, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    })
    return response.json()
}