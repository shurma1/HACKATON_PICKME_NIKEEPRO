import os from 'os';

export const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    // @ts-ignore
    for (const iface of interfaces[interfaceName]) {
      // Проверяем, что это IPv4 адрес и он не является внутренним (loopback)
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address; // Возвращаем первый найденный адрес
      }
    }
  }
  return null;
}
