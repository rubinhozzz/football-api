import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
	secret: 'test',
	providers: [
	  CredentialsProvider({
		name: "Credentials",
		credentials: {
		  username: { label: "Username", type: "text", placeholder: "username" },
		  password: { label: "Password", type: "password" },
		},
		async authorize(credentials, req) {
		  // Add logic here to look up the user from the credentials supplied
			/*
			const res = await fetch("http://localhost:8000/auth/login", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  username: credentials?.username,
			  password: credentials?.password,
			}),
		  });

		  const user = await res.json();*/
		  const user = { id: "1", name: "Ruben", email: "ruben.flex@gmail.com" }
		  if (user) {
			return user;
		  } else {
			return null;
		  }
		},
	  }),
	],
  });