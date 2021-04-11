function pad(number: number): string {
    return (number > 9 ? '' : '0') + number;
}

export default pad;
