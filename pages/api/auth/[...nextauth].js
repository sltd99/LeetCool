import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { useAxios } from "hooks";

const axios = useAxios();

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // console.log(token, user, account, profile, isNewUser);
      const {
        data: { user_id },
      } = await axios.post("/users/", { email: token.email, name: token.name });
      return {
        ...token,
        user_id,
      };
    },
    async session(session, { user_id }) {
      // Add property to session, like an access_token from a provider.
      return {
        ...session,
        user_id,
      };
    },
  },
});

/*
{
  user: {
    name: 'Longlong Lu',
    email: 'longlonglu68@gmail.com',
    image: 'https://lh3.googleusercontent.com/a-/AOh14Gi4HiLpLgAnQiz5a2bC6uE5jU7371NQwzfl_-UU=s96-c'
  },
  expires: '2021-09-26T01:59:57.728Z',
  user_id: '6126af4256e28e7ef0c2f209'
}
*/
