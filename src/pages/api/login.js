export default async function login(req, res) {
	try {
		const didToken = req.headers.authorization.substr(7);
		res.status(200).json({ authenticated: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
