const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const getCommentDate = data => {
    const difference = Date.now() - Number(data)
    if (difference > 0 && difference <= 60000) return '1 минуту назад'
    else if (difference > 60000 && difference <= 300000) {
        return '5 минут назад'
    } else if (difference > 300000 && difference <= 600000) {
        return '10 минут назад'
    } else if (difference > 600000 && difference <= 1800000) {
        return '30 минут назад'
    } else if (difference > 1800000 && difference <= 3600000) {
        return '30 минут назад'
    } else if (difference > 3600000 && difference <= 86400000) {
        return `${new Date(Number(data)).getHours()} ${new Date(
            Number(data)
        ).getMinutes()}`
    } else if (difference > 86400000 && difference <= 2419200000) {
        return `${new Date(Number(data)).getDate()} ${
            monthNames[new Date(Number(data)).getMonth()]
        }`
    }
    return `${new Date(Number(data)).getDate()} ${
        monthNames[new Date(Number(data)).getMonth()]
    } ${new Date(Number(data)).getFullYear()}`
}

export default getCommentDate
