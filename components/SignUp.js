import styles from '../styles/SignUp.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import Realistic from 'react-canvas-confetti/dist/presets/realistic';
import { useRouter } from 'next/router'


function SignUp() {
    const dispatch = useDispatch();
    const router = useRouter()


    const [firstname, setFirstname] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confetti, setConfetti] = useState(false);

    const handleRegister = () => {
        fetch('https://back-hackatweet.vercel.app/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: firstname, username: username, password: password }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ firstname: firstname, username: username, token: data.newDoc.token }));
                    setFirstname('');
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
        <h2 className={styles.text}>Create your Hackacheese account</h2>
        <div className={styles.userInfos}>
            <input type="text" placeholder="Firstname" className={styles.inputs} onChange={(e) => setFirstname(e.target.value)} value={firstname} />
            <input type="text" placeholder="Username" className={styles.inputs} onChange={(e) => setUsername(e.target.value)} value={username} />
		    <input type="password" placeholder="Password" className={styles.inputs} onChange={(e) => setPassword(e.target.value)} value={password} />
		    <button onClick={() => handleRegister()} className={styles.signup}>Sign up</button>
            { confetti ? <Realistic autorun={{speed: 1}} /> : ''}
        </div>
    </div>
  );
}

export default SignUp;
