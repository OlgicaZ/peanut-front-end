const mapDay = (day) => {
    switch (day) {
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        case 7:
            return 'Sunday';
        default:
            return 'It is not a valid day';
    }
}

const mapTime = (time) => {
    const [hours] = time.split(':').map(Number);

    if (hours >= 0 && hours <= 11) {
        return 'AM';
    } else {
        return 'PM';
    }
}

export { mapDay, mapTime }