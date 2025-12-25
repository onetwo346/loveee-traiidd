// Check authentication
const user = JSON.parse(localStorage.getItem('lovetriad_user'));

if (!user) {
  window.location.href = 'auth.html';
}

// Global logout function
window.handleLogout = function() {
  console.log('Logout function called');
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = 'Index.html';
};

// Load user data
document.getElementById('user-name').textContent = user.name;
document.getElementById('profile-name').textContent = user.name;
document.getElementById('user-avatar').textContent = user.name.charAt(0).toUpperCase();

const houseNames = {
  spring: 'Spring House',
  summer: 'Summer House',
  fall: 'Fall House',
  winter: 'Winter House'
};

document.getElementById('user-house').textContent = houseNames[user.house];
document.getElementById('profile-house').textContent = houseNames[user.house];

const joinDate = new Date(user.joinedDate);
document.getElementById('join-date').textContent = joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

document.getElementById('stat-posts').textContent = user.posts || 0;
document.getElementById('stat-replies').textContent = user.replies || 0;
document.getElementById('stat-likes').textContent = user.likes || 0;

// Edit Profile
document.getElementById('edit-profile-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  user.name = document.getElementById('edit-name').value;
  user.email = document.getElementById('edit-email').value;
  user.house = document.getElementById('edit-house').value;
  user.location = document.getElementById('edit-location').value;
  user.bio = document.getElementById('edit-bio').value;
  
  localStorage.setItem('lovetriad_user', JSON.stringify(user));
  
  closeModal('edit-profile-modal');
  location.reload();
});

// Load profile data into edit form
function loadProfileData() {
  document.getElementById('edit-name').value = user.name;
  document.getElementById('edit-email').value = user.email;
  document.getElementById('edit-house').value = user.house;
  document.getElementById('edit-location').value = user.location || '';
  document.getElementById('edit-bio').value = user.bio || '';
}

// Open modal and load data
const originalOpenModal = window.openModal;
window.openModal = function(modalId) {
  if (modalId === 'edit-profile') {
    loadProfileData();
  }
  originalOpenModal(modalId);
};

// New Topic
document.getElementById('new-topic-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const topic = {
    id: Date.now(),
    house: document.getElementById('topic-house').value,
    title: document.getElementById('topic-title').value,
    content: document.getElementById('topic-content').value,
    author: user.name,
    authorId: user.email,
    createdAt: new Date().toISOString(),
    replies: 0,
    views: 0
  };
  
  // Get existing topics
  const topics = JSON.parse(localStorage.getItem('lovetriad_topics') || '[]');
  topics.unshift(topic);
  localStorage.setItem('lovetriad_topics', JSON.stringify(topics));
  
  // Update user stats
  user.posts = (user.posts || 0) + 1;
  localStorage.setItem('lovetriad_user', JSON.stringify(user));
  
  closeModal('new-topic-modal');
  alert('Topic created successfully!');
  location.reload();
});

// Open topic modal
function openTopicModal(topicId) {
  // This would open a detailed topic view with comments
  alert('Topic view coming soon! This will show the full discussion with real-time comments.');
}

// Simulate real-time activity updates
function updateActivity() {
  const activities = [
    { user: 'Sarah M.', house: 'Spring House', action: 'posted', content: 'Just joined and excited to connect!', time: '2 hours ago' },
    { user: 'Marcus T.', house: 'Summer House', action: 'replied', content: 'This resonates deeply with me.', time: '5 hours ago' },
    { user: 'Luna K.', house: 'Winter House', action: 'created', content: 'Seeking guidance on practices', time: '1 day ago' }
  ];
  
  // In a real app, this would fetch from a backend
  console.log('Activity feed loaded');
}

updateActivity();
