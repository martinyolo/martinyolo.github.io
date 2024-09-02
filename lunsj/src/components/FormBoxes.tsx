import * as React from 'react';
import { FormGroup, Checkbox, FormControlLabel, Button } from '@mui/material';
import { firestore } from '../lib/firebase'; // Adjust the import path according to your project structure
import { doc, setDoc, deleteDoc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const FormBoxes: React.FC = () => {
    const { currentUser } = useAuth();
    const [votes, setVotes] = useState<{ [key: string]: boolean }>({
        eatTheStreet: false,
        fresh: false,
        flow: false,
    });
    const [vetoVotes, setVetoVotes] = useState<{ [key: string]: boolean }>({
        eatTheStreet: false,
        fresh: false,
        flow: false,
    });
    const [disabledVotes, setDisabledVotes] = useState<boolean>(false);
    const [disabledVetoVotes, setDisabledVetoVotes] = useState<boolean>(false);

    const deleteOldVotes = async () => {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); // Set to midnight today

        const votesCollection = collection(firestore, 'votes');
        const queryVotes = query(votesCollection, where('timestamp', '<', startOfDay));

        const querySnapshotVotes = await getDocs(queryVotes);
        querySnapshotVotes.forEach(async (docSnapshot) => {
            await deleteDoc(docSnapshot.ref);
            console.log(`Deleted old vote: ${docSnapshot.id}`);
        });

        const vetoVotesCollection = collection(firestore, 'vetoVotes');
        const queryVetoVotes = query(vetoVotesCollection, where('timestamp', '<', startOfDay));

        const querySnapshotVetoVotes = await getDocs(queryVetoVotes);
        querySnapshotVetoVotes.forEach(async (docSnapshot) => {
            await deleteDoc(docSnapshot.ref);
            console.log(`Deleted old veto vote: ${docSnapshot.id}`);
        });
    };

    useEffect(() => {
        const fetchVotes = async () => {
            if (currentUser && currentUser.uid) {
                const userVotesDoc = doc(firestore, 'votes', currentUser.uid);
                const docSnapVotes = await getDoc(userVotesDoc);

                if (docSnapVotes.exists()) {
                    setVotes(docSnapVotes.data() as { [key: string]: boolean });
                    setDisabledVotes(true); // Disable checkboxes if votes already exist
                }

                const userVetoVotesDoc = doc(firestore, 'vetoVotes', currentUser.uid);
                const docSnapVetoVotes = await getDoc(userVetoVotesDoc);

                if (docSnapVetoVotes.exists()) {
                    setVetoVotes(docSnapVetoVotes.data() as { [key: string]: boolean });
                    setDisabledVetoVotes(true); // Disable checkboxes if veto votes already exist
                }
            }
        };

        deleteOldVotes();
        fetchVotes();
    }, [currentUser]);

    const handleChangeVotes = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setVotes({
            ...votes,
            [event.target.name]: event.target.checked,
        });

        await deleteOldVotes(); // Check and delete old votes after every change
    };

    const handleChangeVetoVotes = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setVetoVotes({
            ...vetoVotes,
            [event.target.name]: event.target.checked,
        });

        await deleteOldVotes(); // Check and delete old veto votes after every change
    };

    const sendVotesToFirebase = async () => {
        if (currentUser && currentUser.uid) {
            try {
                const votesDoc = doc(firestore, 'votes', currentUser.uid);
                await setDoc(votesDoc, {
                    ...votes,
                    timestamp: new Date() // Add timestamp field
                });

                console.log('Votes successfully sent');
                setDisabledVotes(true); // Disable checkboxes after successful submission
            } catch (error) {
                console.error('Error sending votes:', error);
            }
        }
    };

    const sendVetoVotesToFirebase = async () => {
        if (currentUser && currentUser.uid) {
            try {
                const vetoVotesDoc = doc(firestore, 'vetoVotes', currentUser.uid);
                await setDoc(vetoVotesDoc, {
                    ...vetoVotes,
                    timestamp: new Date() // Add timestamp field
                });

                console.log('Veto votes successfully sent');
                setDisabledVetoVotes(true); // Disable checkboxes after successful submission
            } catch (error) {
                console.error('Error sending veto votes:', error);
            }
        }
    };

    const deleteVotesFromFirebase = async () => {
        if (currentUser && currentUser.uid) {
            try {
                const votesDoc = doc(firestore, 'votes', currentUser.uid);
                await deleteDoc(votesDoc);

                console.log('Votes successfully deleted');
                setDisabledVotes(false); // Enable checkboxes after successful deletion

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

    const deleteVetoVotesFromFirebase = async () => {
        if (currentUser && currentUser.uid) {
            try {
                const vetoVotesDoc = doc(firestore, 'vetoVotes', currentUser.uid);
                await deleteDoc(vetoVotesDoc);

                console.log('Veto votes successfully deleted');
                setDisabledVetoVotes(false); // Enable checkboxes after successful deletion

                // Reset votes state
                setVetoVotes({
                    eatTheStreet: false,
                    fresh: false,
                    flow: false,
                });
            } catch (error) {
                console.error('Error deleting veto votes:', error);
            }
        }
    };

    return (
        <div style={{ marginLeft: '20px'}}>
            {currentUser ? (
                <div>
                    <h2>Stemmer</h2>
                    <FormGroup>
                        <FormControlLabel
                            disabled={disabledVotes}
                            control={
                                <Checkbox
                                    checked={votes.eatTheStreet}
                                    onChange={handleChangeVotes}
                                    name="eatTheStreet"
                                />
                            }
                            label="Eat the street"
                        />
                        <FormControlLabel
                            disabled={disabledVotes}
                            control={
                                <Checkbox
                                    checked={votes.fresh}
                                    onChange={handleChangeVotes}
                                    name="fresh"
                                />
                            }
                            label="Fresh"
                        />
                        <FormControlLabel
                            disabled={disabledVotes}
                            control={
                                <Checkbox
                                    checked={votes.flow}
                                    onChange={handleChangeVotes}
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
                        disabled={disabledVotes}
                    >
                        Stem
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={deleteVotesFromFirebase}
                        disabled={!disabledVotes}
                    >
                        Slett stemmer
                    </Button>

                    <h2>Vetostemmer</h2>
                    <FormGroup>
                        <FormControlLabel
                            disabled={disabledVetoVotes}
                            control={
                                <Checkbox
                                    checked={vetoVotes.eatTheStreet}
                                    onChange={handleChangeVetoVotes}
                                    name="eatTheStreet"
                                />
                            }
                            label="Eat the street"
                        />
                        <FormControlLabel
                            disabled={disabledVetoVotes}
                            control={
                                <Checkbox
                                    checked={vetoVotes.fresh}
                                    onChange={handleChangeVetoVotes}
                                    name="fresh"
                                />
                            }
                            label="Fresh"
                        />
                        <FormControlLabel
                            disabled={disabledVetoVotes}
                            control={
                                <Checkbox
                                    checked={vetoVotes.flow}
                                    onChange={handleChangeVetoVotes}
                                    name="flow"
                                />
                            }
                            label="Flow"
                        />
                    </FormGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendVetoVotesToFirebase}
                        disabled={disabledVetoVotes}
                    >
                        Veto
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={deleteVetoVotesFromFirebase}
                        disabled={!disabledVetoVotes}
                    >
                        Slett vetostemmer
                    </Button>
                </div>
            ) : (
                <h1>Logg inn for å stemme</h1>
            )}
        </div>
    );
};

export default FormBoxes;

