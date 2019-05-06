const formatStringDate = date => {
    if (!date) {
        return false;
    }

    const initDate = new Date(date);

    if (!initDate) {
        return false;
    }

    let getDate = initDate.getDate();
    let getMonth = initDate.getMonth();
    const getYear = initDate.getFullYear();
    getDate = getDate > 10 ? getDate : '0' + getDate;
    getMonth = getMonth > 10 ? getMonth : '0' + getMonth;

    return getDate + '/' + getMonth + '/' + getYear;
};

export { formatStringDate };
