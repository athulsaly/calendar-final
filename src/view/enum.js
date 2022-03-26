const kitchenStatuses = () => {
    return {
        "0": { value: 'Created', label: 'Created' },
        "10": { value: 'Pending', label: 'Pending' },
        "20": { value: 'Confirmed', label: 'Confirmed' },
        "30": { value: 'Canceled', label: 'Canceled' },
        "40": { value: 'Completed', label: 'Completed' }
    }
}

export { kitchenStatuses }