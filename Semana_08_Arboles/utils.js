const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }

    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export { Compare, defaultCompare };