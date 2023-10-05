toIPv4 = (ipV6) => {
    // Controla si la dirección IP tiene el formato de una dirección IPv6 (incluyendo '::')
    if (ipV6.includes(':')) {
        // Divide la dirección IP a partir de los dos puntos
        const parts = ipV6.split(':');

        // La última parte contiene la dirección IPv4 en el formato IPv6.
        return parts[parts.length - 1];
    }

    return ipV6;
}

module.exports = { toIPv4 };