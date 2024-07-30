import os from 'os';

export const getIPAddresses = () => {
  const interfaces = os.networkInterfaces();
  const addresses = {
    ipv4: [],
    ipv6: [],
  };

  for (const iface in interfaces) {
    for (const alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        addresses.ipv4.push(alias.address);
      } else if (alias.family === 'IPv6' && !alias.internal) {
        addresses.ipv6.push(alias.address);
      }
    }
  }

  return addresses;
}
