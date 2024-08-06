export function equals (objA, objB) {
    if (!objA && !objB){
        return false;
    }

    if (!objA || !objB) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (objA[key] !== objB[key]) return false;
    }

    return true;
}