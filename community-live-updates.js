// Live Community Updates - Makes the preview widgets feel active and dynamic

// Sample data pools
const members = [
  { name: 'Sarah M.', house: 'Spring House', avatar: 'S', color: '#b7595c' },
  { name: 'Marcus T.', house: 'Summer House', avatar: 'M', color: '#2d2654' },
  { name: 'Luna K.', house: 'Winter House', avatar: 'L', color: '#8b6f47' },
  { name: 'Emma W.', house: 'Spring House', avatar: 'E', color: '#5a7c8f' },
  { name: 'James R.', house: 'Summer House', avatar: 'J', color: '#c96567' },
  { name: 'Alex P.', house: 'Fall House', avatar: 'A', color: '#3d3464' },
  { name: 'Maria S.', house: 'Winter House', avatar: 'M', color: '#a08558' },
  { name: 'David L.', house: 'Spring House', avatar: 'D', color: '#6b8da0' },
  { name: 'Rachel K.', house: 'Summer House', avatar: 'R', color: '#d87578' },
  { name: 'Tom H.', house: 'Fall House', avatar: 'T', color: '#4a5f7a' }
];

const discussions = [
  { title: 'Tending Circle Rituals', icon: '🌸', house: 'Spring House', replies: 42 },
  { title: 'Brotherhood & Vulnerability', icon: '🔥', house: 'Summer House', replies: 38 },
  { title: 'Midnight Vigil Practices', icon: '🌙', house: 'Winter House', replies: 56 },
  { title: 'Harvest Season Planning', icon: '🍂', house: 'Fall House', replies: 29 },
  { title: 'Sacred Geometry Study', icon: '✨', house: 'Spring House', replies: 45 },
  { title: 'Fire Circle Protocols', icon: '🔥', house: 'Summer House', replies: 33 },
  { title: 'Winter Solstice Prep', icon: '❄️', house: 'Winter House', replies: 51 },
  { title: 'Relationship Boundaries', icon: '💫', house: 'Fall House', replies: 67 }
];

const activities = [
  'joined a video call',
  'posted in {house}',
  'started a discussion',
  'RSVP\'d to an event',
  'shared a resource',
  'commented on a post',
  'went live',
  'joined the community'
];

// Get random item from array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Get random time ago
function getRandomTimeAgo() {
  const times = ['Just now', '1 min ago', '2 min ago', '3 min ago', '5 min ago', '8 min ago', '10 min ago'];
  return getRandom(times);
}

// Update online members count
function updateOnlineCount() {
  const badge = document.querySelector('.online-badge');
  if (badge) {
    const count = Math.floor(Math.random() * 5) + 10; // 10-14
    badge.textContent = `${count} active`;
  }
}

// Update discussions count
function updateDiscussionsCount() {
  const badge = document.querySelector('.activity-badge');
  if (badge) {
    const count = Math.floor(Math.random() * 10) + 20; // 20-29
    badge.textContent = `${count} new today`;
  }
}

// Add new activity item
function addActivityItem() {
  const stream = document.querySelector('.activity-stream');
  if (!stream) return;

  const member = getRandom(members);
  const activity = getRandom(activities).replace('{house}', member.house);
  
  const item = document.createElement('div');
  item.className = 'activity-item';
  item.style.opacity = '0';
  item.style.transform = 'translateY(-10px)';
  item.innerHTML = `
    <div class="activity-avatar" style="background: linear-gradient(135deg, ${member.color}, ${member.color}dd)">${member.avatar}</div>
    <div class="activity-content">
      <strong>${member.name}</strong> ${activity}
      <span class="activity-timestamp">Just now</span>
    </div>
  `;
  
  // Insert at the top
  stream.insertBefore(item, stream.firstChild);
  
  // Animate in
  setTimeout(() => {
    item.style.transition = 'all 0.4s ease';
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
  }, 10);
  
  // Keep only 4 items
  const items = stream.querySelectorAll('.activity-item');
  if (items.length > 4) {
    const lastItem = items[items.length - 1];
    lastItem.style.opacity = '0';
    lastItem.style.transform = 'translateY(10px)';
    setTimeout(() => lastItem.remove(), 400);
  }
  
  // Update timestamps
  updateTimestamps();
}

// Update all timestamps
function updateTimestamps() {
  const timestamps = document.querySelectorAll('.activity-timestamp');
  timestamps.forEach((ts, index) => {
    if (index === 0) {
      ts.textContent = 'Just now';
    } else if (index === 1) {
      ts.textContent = '2 min ago';
    } else if (index === 2) {
      ts.textContent = '5 min ago';
    } else if (index === 3) {
      ts.textContent = '8 min ago';
    }
  });
}

// Update discussion times
function updateDiscussionTimes() {
  const times = document.querySelectorAll('.discussion-time');
  times.forEach((time, index) => {
    const hours = [2, 3, 4, 5, 6];
    time.textContent = `${hours[index] || 2}h ago`;
  });
}

// Randomly update a discussion's reply count
function updateDiscussionReplies() {
  const items = document.querySelectorAll('.discussion-preview-item');
  if (items.length === 0) return;
  
  const randomItem = items[Math.floor(Math.random() * items.length)];
  const replySpan = randomItem.querySelector('.discussion-preview-content span');
  if (replySpan) {
    const currentText = replySpan.textContent;
    const match = currentText.match(/(\d+) replies/);
    if (match) {
      const newCount = parseInt(match[1]) + 1;
      replySpan.textContent = currentText.replace(/\d+ replies/, `${newCount} replies`);
      
      // Flash effect
      randomItem.style.background = 'rgba(183, 89, 92, 0.15)';
      setTimeout(() => {
        randomItem.style.background = 'rgba(31, 27, 71, 0.02)';
      }, 600);
    }
  }
}

// Pulse the live badge
function pulseLiveBadge() {
  const badge = document.querySelector('.live-pulse-badge');
  if (badge) {
    badge.style.transform = 'scale(1.1)';
    setTimeout(() => {
      badge.style.transform = 'scale(1)';
    }, 200);
  }
}

// Initialize live updates
function initLiveUpdates() {
  // Only run if we're on the community section
  if (!document.querySelector('.community-preview-grid')) return;
  
  // Update online count every 8-12 seconds
  setInterval(updateOnlineCount, Math.random() * 4000 + 8000);
  
  // Update discussions count every 15-20 seconds
  setInterval(updateDiscussionsCount, Math.random() * 5000 + 15000);
  
  // Add new activity every 5-8 seconds
  setInterval(addActivityItem, Math.random() * 3000 + 5000);
  
  // Update discussion replies every 10-15 seconds
  setInterval(updateDiscussionReplies, Math.random() * 5000 + 10000);
  
  // Pulse live badge every 3 seconds
  setInterval(pulseLiveBadge, 3000);
  
  // Update discussion times every 30 seconds
  setInterval(updateDiscussionTimes, 30000);
  
  console.log('🔴 Live community updates activated!');
}

// Add new comment to feed
function addLiveComment() {
  const feed = document.querySelector('.live-comments-feed');
  if (!feed) return;

  const member = getRandom(members);
  const messages = [
    'Just joined the community and loving the energy here! 💫',
    'Our triad has been exploring new rituals together. So grateful for this space.',
    'Anyone have tips for navigating challenging conversations in triads?',
    'The support here is incredible. Thank you all for being so welcoming! 🙏',
    'Excited to attend my first meetup this weekend!',
    'Reading through the forum posts and learning so much from everyone.',
    'Our house gathering was transformative. The power of three is real ✨',
    'Looking forward to connecting with more members in my area!',
    'Just finished a deep discussion about boundaries. This community is amazing.',
    'Sharing some resources in the forum that helped our triad grow stronger.'
  ];
  
  const comment = document.createElement('div');
  comment.className = 'comment-item';
  comment.style.opacity = '0';
  comment.style.transform = 'translateY(-10px)';
  comment.innerHTML = `
    <div class="comment-avatar" style="background: linear-gradient(135deg, ${member.color}, ${member.color}dd)">${member.avatar}</div>
    <div class="comment-content">
      <div class="comment-header">
        <strong>${member.name}</strong>
        <span class="comment-house">${member.house}</span>
        <span class="comment-time">Just now</span>
      </div>
      <p>${getRandom(messages)}</p>
    </div>
  `;
  
  feed.insertBefore(comment, feed.firstChild);
  
  setTimeout(() => {
    comment.style.transition = 'all 0.4s ease';
    comment.style.opacity = '1';
    comment.style.transform = 'translateY(0)';
  }, 10);
  
  // Keep only 6 comments
  const comments = feed.querySelectorAll('.comment-item');
  if (comments.length > 6) {
    const lastComment = comments[comments.length - 1];
    lastComment.style.opacity = '0';
    lastComment.style.transform = 'translateY(10px)';
    setTimeout(() => lastComment.remove(), 400);
  }
  
  updateCommentTimestamps();
}

// Update comment timestamps
function updateCommentTimestamps() {
  const times = document.querySelectorAll('.comment-time');
  const timeLabels = ['Just now', '2 min ago', '5 min ago', '8 min ago', '12 min ago', '15 min ago'];
  times.forEach((time, index) => {
    if (index < timeLabels.length) {
      time.textContent = timeLabels[index];
    }
  });
}

// Handle posting a comment (for logged-in users)
window.postComment = function() {
  const textarea = document.getElementById('comment-textarea');
  if (!textarea || !textarea.value.trim()) return;
  
  const feed = document.querySelector('.live-comments-feed');
  if (!feed) return;
  
  // Get user info (would come from auth in production)
  const userAvatar = document.getElementById('comment-user-avatar').textContent;
  const userName = 'You';
  
  const comment = document.createElement('div');
  comment.className = 'comment-item';
  comment.style.opacity = '0';
  comment.style.transform = 'translateY(-10px)';
  comment.innerHTML = `
    <div class="comment-avatar" style="background: linear-gradient(135deg, #b7595c, #c96567)">${userAvatar}</div>
    <div class="comment-content">
      <div class="comment-header">
        <strong>${userName}</strong>
        <span class="comment-house">Community Member</span>
        <span class="comment-time">Just now</span>
      </div>
      <p>${textarea.value}</p>
    </div>
  `;
  
  feed.insertBefore(comment, feed.firstChild);
  
  setTimeout(() => {
    comment.style.transition = 'all 0.4s ease';
    comment.style.opacity = '1';
    comment.style.transform = 'translateY(0)';
  }, 10);
  
  textarea.value = '';
  updateCommentTimestamps();
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLiveUpdates);
} else {
  initLiveUpdates();
}

// Add live comments updates
function initLiveComments() {
  if (!document.querySelector('.live-comments-feed')) return;
  
  // Add new comment every 12-18 seconds
  setInterval(addLiveComment, Math.random() * 6000 + 12000);
  
  // Update timestamps every 30 seconds
  setInterval(updateCommentTimestamps, 30000);
  
  console.log('💬 Live comments activated!');
}

// Initialize comments after a short delay
setTimeout(initLiveComments, 2000);
