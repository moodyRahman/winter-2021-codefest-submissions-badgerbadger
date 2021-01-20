import { useState } from "react"
import { useHistory } from "react-router-dom";
import './Register.scss';

export default function Login() {
	const [username, setUsername] = useState<string>("");
	const [password0, setPassword0] = useState<string>("");
	const [password1, setPassword1] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	let history = useHistory();

	const register = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (username.length < 4) {
			return setMessage("Username must have at least 4 characters")
		}
		if (password0 !== password1) {
			return setMessage("Passwords must match!")
		}
		if (password0.length < 6) {
			return setMessage("Password length must be over 6 characters")
		}


		const data = {
			username: username,
			password: password0
		};
		fetch("http://localhost:8080/auth/register", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		})
			.then(res => res.json())
			.then(response => {
				console.log(response);
				if (response.status !== 200) {
					console.log(response)	
					return setMessage("SERVER ERROR");
				} else {
					history.push("/");
					return setMessage("User created!")
				}
			})


	}

	return (
		<form className="register" onSubmit={register}>
			THIS IS THE REGISTER FORM <br></br>
			<label>Username<input type="text" name="username" id="" onChange={e => setUsername(e.target.value)} /></label>
			<br></br>


			<label>Password<input type="password" name="password" id="" onChange={e => setPassword0(e.target.value)} /></label>
			<br></br>

			<label>Confirm Password<input type="password" name="password" id="" onChange={e => setPassword1(e.target.value)} /></label>
			<br></br>

			{message}
			<br />

			<input type="submit" value="Submit" />
		</form>

	)
}
