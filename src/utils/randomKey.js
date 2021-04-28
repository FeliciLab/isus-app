export default function randomKey() {
  const random = () => Math.random().toString(36).substring(2, 15);
  return `${random()}-${random()}`;
}
