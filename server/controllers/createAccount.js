// Create Account: Endpoint for creating a user account.

import bcrypt from "bcrypt";

import User from "../database/seed.js";

export default async function createAccount(req, res) {
	// Get all new user data from request body:
	let { username, password, email, imageURL } = req.body;

	// Create password hash using data with whitespace trimmed:
	const passwordHash = bcrypt.hashSync(password.trim(), 10);

	// Create placeholder image using first character of username when imageURL is falsy:
	imageURL ||= "https://placehold.co/256x256?text=" + username.charAt(0);

	// Try to create a new user:
	try {
		// Create new user in the database table:
		await User.create({
			username: username.trim(),
			passwordHash,
			email,
			imageURL
		});

		// Respond with Success JSON data:
		res.json({
			Success: `User ${username} successfully created.`
		});
	}
	// Otherwise respond with error message:
	catch (error) {
		res.json({
			Error: `Account creation failed: ${error}`
		});
	}
}