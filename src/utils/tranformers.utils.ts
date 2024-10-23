export const formatCurrency = (value: number | string) => {
    const number = Number(value)
    return !isNaN(number) ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(value)) : value
}

export const formatNumber = (value: number | string) => {
    const number = Number(value)
    return !isNaN(number) ? new Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2
    }).format(Number(value)) : value
}

export const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(dateString));
};