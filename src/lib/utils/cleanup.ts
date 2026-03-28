import { User } from "../../generated/prisma/client.js";

export function excludePassword(user: User | null) {
  // delete user.password;
  // return user;

  if (!user) {
    return null;
  }

  const { password, ...rest } = user;

  return rest;
}
