import * as React from 'react';
import { getDocs, collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../lib/firebase'; // Adjust the import path according to your project structure
import { useEffect, useState } from 'react';

interface UserVote {
  uid: string;
  displayName: string;
  votes: { [key: string]: boolean };
  photoURL: string;
}

const VotingResult: React.FC = () => {
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);
  const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({
    eatTheStreet: 0,
    fresh: 0,
    flow: 0,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'votes'), async (snapshot) => {
      console.log('Snapshot received:', snapshot.size, 'documents');
      
      const allVotes: UserVote[] = [];
      const voteCount = { eatTheStreet: 0, fresh: 0, flow: 0 };

      for (const docSnapshot of snapshot.docs) {
        const voteData = docSnapshot.data();
        const uid = docSnapshot.id;

        console.log(`Vote data for UID ${uid}:`, voteData);

        try {
          // Query users collection to find the document with the specific uid field
          const userQuery = query(collection(firestore, 'users'), where('uid', '==', uid));
          const userSnapshot = await getDocs(userQuery);
          if (userSnapshot.empty) {
            console.error(`No user found with UID: ${uid}`);
            continue;
          }
          
          const userDoc = userSnapshot.docs[0];
          const userData = userDoc.data();

          console.log(`User data for UID ${uid}:`, userData);

          if (userData && userData.photoURL) {
            const userVote: UserVote = {
              uid,
              displayName: userData.displayName,
              votes: voteData as { [key: string]: boolean },
              photoURL: userData.photoURL || '', // Use photoURL from user document
            };

            // Count votes
            if (userVote.votes.eatTheStreet) voteCount.eatTheStreet++;
            if (userVote.votes.fresh) voteCount.fresh++;
            if (userVote.votes.flow) voteCount.flow++;

            allVotes.push(userVote);
          } else {
            console.error(`User data is missing photoURL for UID: ${uid}`);
          }
        } catch (error) {
          console.error(`Error fetching user data for UID: ${uid}`, error);
        }
      }

      console.log('All votes:', allVotes);
      console.log('Vote counts:', voteCount);

      setUserVotes(allVotes);
      setVoteCounts(voteCount);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Voting Results</h2>
      <div>
        <h3>Eat the Street: {voteCounts.eatTheStreet}</h3>
        <h3>Fresh: {voteCounts.fresh}</h3>
        <h3>Flow: {voteCounts.flow}</h3>
      </div>
      <div>
        {userVotes.map((userVote) => (
          <div key={userVote.uid} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <img src={userVote.photoURL} alt="User avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
            <div>
              <p> {userVote.displayName}</p>
              {userVote.votes.eatTheStreet && <p>Voted for: Eat the Street</p>}
              {userVote.votes.fresh && <p>Voted for: Fresh</p>}
              {userVote.votes.flow && <p>Voted for: Flow</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingResult;


