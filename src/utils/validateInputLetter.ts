export function validateInputLetter(input: string): boolean {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(input);
}