import {User} from 'next-auth';
import {prisma} from './prisma';
import {compare, hash} from 'bcryptjs';

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  if (!user) throw new Error("User not found");
  
  const compareResult = await compare(password, user.password)
  if (user && compareResult) {
    user.password = ""; // Hide the user password
    return user;
  }
  return null;  
}