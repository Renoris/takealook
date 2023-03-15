export function validateNickname(nickname) {
  // Nickname should only contain Korean characters, letters, numbers, underscores, and dashes
  const regex = /^[가-힣a-zA-Z0-9_-]+$/;
  // Nickname should not be empty or contain only whitespace
  if (nickname.trim().length === 0) {
    return false;
  }
  return regex.test(nickname);
}