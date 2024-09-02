import * as React from 'react';
import { getDocs, collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../lib/firebase'; // Adjust the import path according to your project structure
import { useEffect, useState } from 'react';

interface UserVote {
  uid: string;
  displayName: string;
  votes?: { [key: string]: boolean };
  vetoVotes?: { [key: string]: boolean };
  photoURL: string;
}

const VotingResult: React.FC = () => {
  const [userVotes, setUserVotes] = useState<{ [uid: string]: UserVote }>({});
  const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({
    eatTheStreet: 0,
    fresh: 0,
    flow: 0,
  });
  const [vetoVoteCounts, setVetoVoteCounts] = useState<{ [key: string]: number }>({
    eatTheStreet: 0,
    fresh: 0,
    flow: 0,
  });

  useEffect(() => {
    const userVotesMap: { [uid: string]: UserVote } = {};

    const fetchUserData = async (uid: string) => {
      try {
        // Query users collection to find the document with the specific uid field
        const userQuery = query(collection(firestore, 'users'), where('uid', '==', uid));
        const userSnapshot = await getDocs(userQuery);
        if (userSnapshot.empty) {
          console.error(`No user found with UID: ${uid}`);
          return null;
        }

        const userDoc = userSnapshot.docs[0];
        return userDoc.data();
      } catch (error) {
        console.error(`Error fetching user data for UID: ${uid}`, error);
        return null;
      }
    };

    const unsubscribeVotes = onSnapshot(collection(firestore, 'votes'), async (snapshot) => {
      for (const change of snapshot.docChanges()) {
        const voteData = change.doc.data();
        const uid = change.doc.id;

        if (change.type === 'added' || change.type === 'modified') {
          const userData = await fetchUserData(uid);
          if (userData) {
            userVotesMap[uid] = {
              ...userVotesMap[uid],
              uid,
              displayName: userData.displayName,
              votes: voteData as { [key: string]: boolean },
              photoURL: userData.photoURL,
            };
          }
        } else if (change.type === 'removed') {
          if (userVotesMap[uid]) {
            delete userVotesMap[uid].votes;
            if (!userVotesMap[uid].vetoVotes) {
              delete userVotesMap[uid];
            }
          }
        }
      }

      // Update vote counts
      const updatedVoteCount = { eatTheStreet: 0, fresh: 0, flow: 0 };
      Object.values(userVotesMap).forEach(userVote => {
        if (userVote.votes?.eatTheStreet) updatedVoteCount.eatTheStreet++;
        if (userVote.votes?.fresh) updatedVoteCount.fresh++;
        if (userVote.votes?.flow) updatedVoteCount.flow++;
      });

      setVoteCounts(updatedVoteCount);
      setUserVotes({ ...userVotesMap });
    });

    const unsubscribeVetoVotes = onSnapshot(collection(firestore, 'vetoVotes'), async (snapshot) => {
      for (const change of snapshot.docChanges()) {
        const vetoVoteData = change.doc.data();
        const uid = change.doc.id;

        if (change.type === 'added' || change.type === 'modified') {
          const userData = await fetchUserData(uid);
          if (userData) {
            userVotesMap[uid] = {
              ...userVotesMap[uid],
              uid,
              displayName: userData.displayName,
              vetoVotes: vetoVoteData as { [key: string]: boolean },
              photoURL: userData.photoURL,
            };
          }
        } else if (change.type === 'removed') {
          if (userVotesMap[uid]) {
            delete userVotesMap[uid].vetoVotes;
            if (!userVotesMap[uid].votes) {
              delete userVotesMap[uid];
            }
          }
        }
      }

      // Update veto vote counts
      const updatedVetoCount = { eatTheStreet: 0, fresh: 0, flow: 0 };
      Object.values(userVotesMap).forEach(userVote => {
        if (userVote.vetoVotes?.eatTheStreet) updatedVetoCount.eatTheStreet++;
        if (userVote.vetoVotes?.fresh) updatedVetoCount.fresh++;
        if (userVote.vetoVotes?.flow) updatedVetoCount.flow++;
      });

      setVetoVoteCounts(updatedVetoCount);
      setUserVotes({ ...userVotesMap });
      console.log('Veto vote counts:', updatedVetoCount);
    });

    return () => {
      // Cleanup subscriptions
      unsubscribeVotes();
      unsubscribeVetoVotes();
    };
  }, []);

  return (
    <div>
      <h2>Stemmeresultat</h2>
      <div>
        <h3>
          Eat the Street: {voteCounts.eatTheStreet}
          {vetoVoteCounts.eatTheStreet > 0 && (
            <span style={{ color: 'red' }}> ({vetoVoteCounts.eatTheStreet})</span>
          )}
        </h3>
        <h3>
          Fresh: {voteCounts.fresh}
          {vetoVoteCounts.fresh > 0 && (
            <span style={{ color: 'red' }}> ({vetoVoteCounts.fresh})</span>
          )}
        </h3>
        <h3>
          Flow: {voteCounts.flow}
          {vetoVoteCounts.flow > 0 && (
            <span style={{ color: 'red' }}> ({vetoVoteCounts.flow})</span>
          )}
        </h3>
      </div>
      <div>
        {Object.values(userVotes).map((userVote) => {
          const votesArray = [];
          const vetoVotesArray = [];

          if (userVote.votes?.eatTheStreet) votesArray.push('Eat the Street');
          if (userVote.votes?.fresh) votesArray.push('Fresh');
          if (userVote.votes?.flow) votesArray.push('Flow');

          if (userVote.vetoVotes?.eatTheStreet) vetoVotesArray.push('Eat the Street');
          if (userVote.vetoVotes?.fresh) vetoVotesArray.push('Fresh');
          if (userVote.vetoVotes?.flow) vetoVotesArray.push('Flow');

          const votesString = votesArray.join(', ');
          const vetoVotesString = vetoVotesArray.join(', ');

          return (
            <div key={userVote.uid} style={{ display: 'flex', alignItems: 'center', margin: '10px 0', marginLeft: '10px', marginTop: '10px' }}>
              <img 
                src={userVote.photoURL} 
                alt="User avatar" 
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} 
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '5px' }}>{userVote.displayName}</p>
                {votesString && <p>stemte for: <b>{votesString}</b></p>}
                {vetoVotesString && <p style={{ color: 'red', marginLeft: '10px' }}>(veto: <b>{vetoVotesString}</b>)</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VotingResult;

