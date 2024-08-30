import * as React from 'react';
import { FormGroup, Checkbox, FormControlLabel, Button } from '@mui/material';
import { firestore } from '../lib/firebase'; // Adjust the import path according to your project structure
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const FormBoxes: React.FC = () => {
    const { currentUser } = useAuth();
    const [votes, setVotes] = useState<{ [key: string]: boolean }>({
        eatTheStreet: false,
        fresh: false,
        flow: false,
    });
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        const fetchVotes = async () => {
            if (currentUser && currentUser.uid) {
                const userVotesDoc = doc(firestore, 'votes', currentUser.uid);
                const docSnap = await getDoc(userVotesDoc);

                if (docSnap.exists()) {
                    setVotes(docSnap.data() as { [key: string]: boolean });
                    setDisabled(true); // Disable checkboxes if votes already exist
                }
            }
        };

        fetchVotes();
    }, [currentUser]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVotes({
            ...votes,
            [event.target.name]: event.target.checked,
        });
    };

    const sendVotesToFirebase = async () => {
        if (currentUser && currentUser.uid) {
            try {
                const votesDoc = doc(firestore, 'votes', currentUser.uid);
                await setDoc(votesDoc, votes);

                console.log('Votes successfully sent');
                setDisabled(true); // Disable checkboxes after successful submission
            } catch (error) {
                console.error('Error sending votes:', error);
            }
        }
    };

    const deleteVotesFromFirebase = async () => {
        if (currentUser && currentUser.uid) {
            try {
                const votesDoc = doc(firestore, 'votes', currentUser.uid);
                await deleteDoc(votesDoc);

                console.log('Votes successfully deleted');
                setDisabled(false); // Enable checkboxes after successful deletion

                // Reset votes state
                setVotes({
                    eatTheStreet: false,
                    fresh: false,
                    flow: false,
                });
            } catch (error) {
                console.error('Error deleting votes:', error);
            }
        }
    };

    return (
        <div>
            {currentUser ? (
                <div>
                    <FormGroup>
                        <FormControlLabel
                            disabled={disabled}
                            control={
                                <Checkbox
                                    checked={votes.eatTheStreet}
                                    onChange={handleChange}
                                    name="eatTheStreet"
                                />
                            }
                            label="Eat the street"
                        />
                        <FormControlLabel
                            disabled={disabled}
                            control={
                                <Checkbox
                                    checked={votes.fresh}
                                    onChange={handleChange}
                                    name="fresh"
                                />
                            }
                            label="Fresh"
                        />
                        <FormControlLabel
                            disabled={disabled}
                            control={
                                <Checkbox
                                    checked={votes.flow}
                                    onChange={handleChange}
                                    name="flow"
                                />
                            }
                            label="Flow"
                        />
                    </FormGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendVotesToFirebase}
                        disabled={disabled}
                    >
                        Submit Votes
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={deleteVotesFromFirebase}
                        disabled={!disabled}
                    >
                        Delete Votes
                    </Button>
                </div>
            ) : (
                <h1>Logg inn for å stemme</h1>
            )}
        </div>
    );
};

export default FormBoxes;
