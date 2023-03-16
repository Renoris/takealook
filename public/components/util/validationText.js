export function validateNickname(nickname) {
  // Nickname should only contain Korean characters, letters, numbers, underscores, and dashes
  const regex = /^[가-힣a-zA-Z0-9_-]+$/;
  // Nickname should not be empty or contain only whitespace
  if (nickname.trim().length === 0) {
    return false;
  }
  return regex.test(nickname);
}

export function validateTitle(title) {
  // Nickname should only contain Korean characters, letters, numbers, underscores, dashes, and spaces in the middle
  const regex = /^[가-힣a-zA-Z0-9 _-]+$/;
  // Nickname should not be empty or contain only whitespace
  if (title.trim().length === 0) {
    return false;
  }
  // Nickname should not have a space at the first character
  if (title[0] === ' ') {
    return false;
  }
  return regex.test(title);
}