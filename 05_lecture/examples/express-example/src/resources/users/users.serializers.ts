export function serializeUserResponse(user) {
  return { user: serializeUser(user) };
}

export function serializeUsersListResponse(users) {
  return { users: users.map(serializeUser) };
}

export function serializeUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}
