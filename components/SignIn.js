import styles from '../styles/SignIn.module.css';
import { use, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import Realistic from 'react-canvas-confetti/dist/presets/realistic';
import { useRouter } from 'next/router'


function SignIn() {
    const dispatch = useDispatch();
    const router = useRouter()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confetti, setConfetti] = useState(false);

    const handleLogin = () => {
        fetch('https://back-hackatweet.vercel.app/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ firstname: data.firstname, username: username, token: data.token }));
                    setUsername('');
                    setPassword('');
                    setConfetti(true);
                    router.push("/home")
                }
            });
    };

  return (
    <div className={styles.login}>
        <img src="mouse.png" className={styles.logo} />
        <h2 className={styles.text}>Connect to Hackacheese</h2>
        <div className={styles.userInfos}>
            <input type="text" placeholder="Username" className={styles.inputs} onChange={(e) => setUsername(e.target.value)} value={username} />
		    <input type="password" placeholder="Password" className={styles.inputs} onChange={(e) => setPassword(e.target.value)} value={password} />
		    <button onClick={() => handleLogin()} className={styles.signin}>Sign in</button>
            { confetti ? <Realistic autorun={{speed: 1}} /> : ''}
        </div>
    </div>
  );
}

export default SignIn;
