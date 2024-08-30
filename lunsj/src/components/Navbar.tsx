import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { useState, useEffect } from 'react';

const Navbar = () => {

    let navigate = useNavigate();
    const { currentUser, logout, login } = useAuth();
    const [disableButton, setDisableButton] = useState(false);
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        if (currentUser?.photoURL !== null && currentUser?.photoURL !== undefined) {
            setImage(currentUser?.photoURL);
        }
    }, [currentUser]);

    const handleClickLogin = async () => {
        setDisableButton(true);
        await login().then((res) => {
            setDisableButton(true);
            if (res) {
                navigate('/');
            }
        }).catch((err) => {
            setDisableButton(false);
        });
        setDisableButton(false);
    };

    const handleClickLogout = async () => {
        await logout().then((res) => {
            setDisableButton(true);
            navigate('/');
        }).catch((err) => {
            setDisableButton(false);
        });
        setDisableButton(false);
    };

    return (
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <div style={{ position: 'fixed', top: '15px', right: '15px'}}>
                                {currentUser ? (
                                    // if user is logged in, render logout button
                                    <div>
                                        <Button disabled={disableButton} onClick={handleClickLogout} variant="contained">
                                            Logg ut
                                        </Button>
                                        <Button variant="outlined" >
                                            <img src={image} alt="User profile" style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }} />
                                            {currentUser?.displayName}
                                        </Button>
                                    </div>
                                ) : (
                                    // if user is not logged in, render login button
                                    <Button disabled={disableButton} onClick={handleClickLogin} variant="contained">Logg inn med Google</Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;