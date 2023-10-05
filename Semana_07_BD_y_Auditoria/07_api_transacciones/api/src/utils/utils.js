toIPv4 = (ipV6) => {
    // Check if the IP address is in IPv6 format (includes '::')
    if (ipV6.includes(':')) {
        // Split the IPv6 address
        const parts = ipV6.split(':');

        // The last part contains the IPv4 address in IPv6 format
        return parts[parts.length - 1];
    }

    // If it's already an IPv4 address, return it as is
    return ipV6;
}

module.exports = { toIPv4 };