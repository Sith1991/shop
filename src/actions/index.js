const itemsLoaded = (newItems) => {
    return {
        type: 'BOOKS_LOADED',
        payload: newItems
    }
}

export {
    itemsLoaded
}