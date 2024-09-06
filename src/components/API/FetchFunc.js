export const mocFetch = (url) => {
    return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({message: "Успешно!"})
    })
}