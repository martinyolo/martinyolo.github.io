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
        <div id="c_section" className='fixed top-0 bg-white dark:bg-dark-lysGraa text-black w-screen h-auto content-center z-20 shadow-md'>
            <div id="c_container" className='relative flex flex-col m-auto w-full max-w-7xl pt-5 px-10 justify-between'>
                <div className='flex flex-row justify-between'>
                {currentUser ? (
                    <h1 className="text-4xl p-3 hover:cursor-pointer dark:text-dark-white">Stem i vei!</h1>
                ) : (
                    <h1 className="text-4xl p-3 hover:cursor-pointer dark:text-dark-white">Logg inn for å stemme</h1>
                )}
                    <div className='flex flex-col w-4/5'>
                        <div className='flex flex-row justify-between'>

                            <div className='flex flex-row gap-1 w-auto'>
                                {currentUser ? (
                                    // if user is logged in, render logout button
                                    <div className='flex flex-row gap-1 w-auto'>
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
                                    <Button disabled={disableButton} onClick={handleClickLogin} variant="contained">Logg inn</Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-1 bg-pu-gul'> </div>
        </div>
    );
}

export default Navbar;