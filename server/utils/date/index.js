const formatStringDate = date => {
    const initDate = new Date(date);

    if (!initDate) {
        return false;
    }

    let getDate = initDate.getDate();
    getDate = getDate > 0 ? getDate : '0' + getDate;
    const getMonth = initDate.getMonth();
    const getYear = initDate.getFullYear();

    return getDate + '/' + getMonth + '/' + getYear;
};

export { formatStringDate };
