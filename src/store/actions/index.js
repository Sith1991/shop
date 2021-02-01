const itemsLoaded = (newItems) => {
    return {
        type: 'ITEMS_LOADED',
        payload: newItems
    }
}

export {
    itemsLoaded
}