import { useEffect, useState } from 'react';
import './home.css';
import profilePlaceholder from './assets/profile.png';
import tshirt from './assets/tshirt.png';
import referralIcon from './assets/referral.png';
import donationIcon from './assets/donate.png';
import badgeIcon from './assets/badge.png';
import trophyIcon from './assets/trophy.png';

export default function Home() {
  const [activeTab, setActiveTab] = useState('about');
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(false);
  const [rewards] = useState([
    { id: 1, name: "Foundation T-Shirt", points: 500, image: tshirt, unlocked: true },
    { id: 2, name: "VIP Badge", points: 1000, image: badgeIcon, unlocked: false },
    { id: 3, name: "Exclusive Trophy", points: 2000, image: trophyIcon, unlocked: false }
  ]);
  const [selectedReward, setSelectedReward] = useState(null);

  // 🌐 Use environment variable or fallback to localhost
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch(`${API_BASE}/api/user`);
        const leaderboardRes = await fetch(`${API_BASE}/api/leaderboard`);

        if (!userRes.ok || !leaderboardRes.ok) throw new Error('API error');

        const userData = await userRes.json();
        const leaderboardData = await leaderboardRes.json();

        setUser(userData);
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(true);
      }
    }

    fetchData();
  }, []);

  if (error) return <div style={{ padding: '2rem', color: 'red' }}>⚠️ Failed to load data from server. Please try again.</div>;
  if (!user) return <div style={{ padding: '2rem' }}>Loading...</div>;


  return (
    <div className="home-container">
      {/* Profile Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-header">
          <img src={profilePlaceholder} alt="Profile" className="profile-image" />
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-join-date">Member since January 2024</p>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{user.points}</span>
            <span className="stat-label">Points</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.donations}</span>
            <span className="stat-label">Donations</span>
          </div>
        </div>

        <div className="referral-section">
          <h3>Your Referral Code</h3>
          <div className="referral-code">{user.referralCode}</div>
          <button className="share-button">Share</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>Dashboard</button>
          <button className={`nav-tab ${activeTab === 'rewards' ? 'active' : ''}`} onClick={() => setActiveTab('rewards')}>Rewards</button>
          <button className={`nav-tab ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>Leaderboard</button>
        </div>

        {/* Dashboard */}
        {activeTab === 'about' && (
          <div className="dashboard-content">
            <h1 className="welcome-message">Welcome back, {user.name}!</h1>
            <p className="subtitle">Here's your impact summary</p>

            <div className="stats-grid">
              <div className="stat-card">
                <img src={referralIcon} alt="Referrals" className="stat-icon" />
                <div className="stat-info">
                  <h3>Referrals</h3>
                  <p>12 people joined</p>
                </div>
              </div>

              <div className="stat-card">
                <img src={donationIcon} alt="Donations" className="stat-icon" />
                <div className="stat-info">
                  <h3>Donations Raised</h3>
                  <p>{user.donations} causes supported</p>
                </div>
              </div>

              <div className="stat-card">
                <img src={trophyIcon} alt="Points" className="stat-icon" />
                <div className="stat-info">
                  <h3>Your Points</h3>
                  <p>{user.points} points collected</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item"><div className="activity-dot"></div><p>You referred Sarah (May 15)</p></div>
                <div className="activity-item"><div className="activity-dot"></div><p>Donated to Clean Water Initiative (May 10)</p></div>
                <div className="activity-item"><div className="activity-dot"></div><p>Earned 50 points (May 5)</p></div>
              </div>
            </div>
          </div>
        )}

        {/* Rewards */}
        {activeTab === 'rewards' && (
          <div className="rewards-content">
            <h1 className='welcome-message'>Your Rewards</h1>
            <p className="subtitle">{user.points} points available</p>

            <div className="rewards-grid">
              {rewards.map(reward => (
                <div key={reward.id} className={`reward-card ${reward.unlocked ? 'unlocked' : 'locked'}`}>
                  <div className="reward-image-container">
                    <img
                      src={reward.image}
                      alt={reward.name}
                      className={`reward-image ${!reward.unlocked ? 'locked-image' : ''}`}
                    />
                    {!reward.unlocked && (
                      <div className="lock-overlay">
                        <span className="points-needed">{reward.points} pts</span>
                      </div>
                    )}
                  </div>
                  <h3>{reward.name}</h3>
                  {reward.unlocked ? (
                    <button className="claim-button" onClick={() => setSelectedReward(reward)}>
                      Claim Reward
                    </button>
                  ) : (
                    <p className="progress-text">
                      {Math.min(user.points, reward.points)}/{reward.points} points
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Modal */}
            {selectedReward && (
              <div className="modal-overlay" onClick={() => setSelectedReward(null)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <img src={selectedReward.image} alt={selectedReward.name} className="modal-image" />
                  <h2>{selectedReward.name}</h2>
                  <p>You have enough points to claim this reward.</p>
                  <button className="claim-button" onClick={() => setSelectedReward(null)}>Confirm Claim</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="leaderboard-section">
            <h2 className="section-title">Top Donors</h2>
            <p className="section-subtitle">Leaderboard based on points earned</p>
            
            <div className="leaderboard-cards">
              {leaderboard.map((entry, index) => (
                <div key={index} className="leaderboard-card">
                  <div className="rank-circle">{index + 1}</div>
                  <div className="leaderboard-details">
                    <div className="leaderboard-name">{entry.name}</div>
                    <div className="leaderboard-points">{entry.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
