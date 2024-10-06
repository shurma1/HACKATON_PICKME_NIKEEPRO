
export function initEnv() {
  const command = process.env.npm_lifecycle_script;
  if(! command) {
    return;
  }

  const position = command.indexOf(' env ');
  if(position === -1) {
    return;
  }
  const envValues = command.substring(position + 5);
  const env = envValues.split(' ');

  env.forEach(item => {
    const [key, value] = item.split('=');

    process.env[key] = value;
  })
}