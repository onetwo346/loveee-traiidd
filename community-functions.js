// Premium Community Hub Functions

// Start Live Session
window.startLiveSession = function() {
  if (!user) {
    alert('Please sign in to start a live session');
    window.location.href = 'auth.html';
    return;
  }
  
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal-content">
      <button class="modal-close" onclick="this.closest('.video-modal').remove()">×</button>
      <h2>🔴 Start Live Session</h2>
      <form onsubmit="event.preventDefault(); launchLiveStream(this);">
        <div class="form-group">
          <label>Session Title</label>
          <input type="text" name="title" required placeholder="e.g., Monthly Tending Circle">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea name="description" rows="3" required placeholder="What will you discuss?"></textarea>
        </div>
        <div class="form-group">
          <label>House</label>
          <select name="house" required>
            <option value="spring">Spring House</option>
            <option value="summer">Summer House</option>
            <option value="fall">Fall House</option>
            <option value="winter">Winter House</option>
            <option value="all">All Houses</option>
          </select>
        </div>
        <div class="form-group">
          <label>Session Type</label>
          <select name="type" required>
            <option value="video">Video + Audio</option>
            <option value="audio">Audio Only</option>
          </select>
        </div>
        <button type="submit" class="btn-premium primary full-width">
          <span class="btn-icon">📹</span>
          Go Live Now
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
};

function launchLiveStream(form) {
  const formData = new FormData(form);
  alert(`🔴 LIVE SESSION STARTING!\n\nTitle: ${formData.get('title')}\nType: ${formData.get('type')}\n\nIn a production environment, this would:\n- Initialize WebRTC connection\n- Start camera/microphone\n- Broadcast to all members\n- Enable real-time chat\n- Record session for replay`);
  form.closest('.video-modal').remove();
}

// Join Live Session
window.joinLiveSession = function(sessionId) {
  if (!user) {
    alert('Please sign in to join live sessions');
    window.location.href = 'auth.html';
    return;
  }
  
  const modal = document.createElement('div');
  modal.className = 'video-modal fullscreen';
  modal.id = 'live-session-modal';
  modal.innerHTML = `
    <button class="modal-close-x" onclick="document.getElementById('live-session-modal').remove()" style="position: fixed; top: 20px; right: 380px; width: 50px; height: 50px; border-radius: 50%; background: #dc3545; color: white; border: none; font-size: 2rem; cursor: pointer; z-index: 10001; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">×</button>
    <div class="video-room">
      <div class="video-header">
        <div class="session-title">
          <span class="live-indicator">🔴 LIVE</span>
          <h3>Spring House Circle</h3>
        </div>
        <div class="video-controls">
          <button class="control-btn" onclick="toggleMic()">🎤</button>
          <button class="control-btn" onclick="toggleCamera()">📹</button>
          <button class="control-btn" onclick="shareScreen()">🖥️</button>
          <button class="control-btn leave-btn" onclick="document.getElementById('live-session-modal').remove()" style="background: #dc3545; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem;">📞 Leave Session</button>
        </div>
      </div>
      
      <div class="video-grid">
        <div class="video-tile main">
          <video autoplay muted style="width: 100%; height: 100%; object-fit: cover; background: #1f1b47;">
            <source src="https://via.placeholder.com/800x450/b7595c/ffffff?text=Live+Video+Feed" type="video/mp4">
          </video>
          <div class="video-label">Sarah M. (Host)</div>
        </div>
        <div class="video-tile">
          <div class="video-placeholder">
            <div class="avatar-large">E</div>
            <span>Emma W.</span>
          </div>
        </div>
        <div class="video-tile">
          <div class="video-placeholder">
            <div class="avatar-large">J</div>
            <span>James R.</span>
          </div>
        </div>
        <div class="video-tile">
          <div class="video-placeholder">
            <div class="avatar-large">${user.name.charAt(0)}</div>
            <span>You</span>
          </div>
        </div>
      </div>
      
      <div class="video-chat">
        <div class="chat-header" style="padding: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center; color: #fff;">
          <h4 style="margin: 0; font-size: 1rem;">Live Chat</h4>
          <span class="viewer-count" style="font-size: 0.85rem; opacity: 0.8;">👁️ 12 watching</span>
        </div>
        <div class="chat-messages" id="live-chat-messages">
          <div class="chat-msg">
            <strong>Emma:</strong> So glad to be here!
          </div>
          <div class="chat-msg">
            <strong>James:</strong> This is wonderful 💫
          </div>
        </div>
        <div class="chat-input-premium">
          <input type="text" id="live-chat-input" placeholder="Send a message..." onkeypress="if(event.key==='Enter') sendLiveChat()">
          <button onclick="sendLiveChat()">➤</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

function sendLiveChat() {
  const input = document.getElementById('live-chat-input');
  const messages = document.getElementById('live-chat-messages');
  if (input.value.trim()) {
    messages.innerHTML += `<div class="chat-msg"><strong>You:</strong> ${input.value}</div>`;
    messages.scrollTop = messages.scrollHeight;
    input.value = '';
  }
}

// Start Video Call
window.startVideoCall = function(memberId) {
  if (!user) {
    alert('Please sign in to make video calls');
    return;
  }
  
  alert(`📞 Calling ${memberId}...\n\nIn production, this would:\n- Establish peer-to-peer WebRTC connection\n- Enable video/audio streams\n- Support screen sharing\n- Include chat functionality`);
};

window.openVideoCallModal = function() {
  if (!user) {
    alert('Please sign in to start group calls');
    return;
  }
  
  alert('🎥 Group Call Feature\n\nStart a video call with multiple members:\n- Select participants\n- Schedule or start immediately\n- Share meeting link\n- Record sessions\n- Breakout rooms available');
};

// RSVP to Meetup
window.rsvpMeetup = function(meetupId) {
  if (!user) {
    alert('Please sign in to RSVP to meetups');
    window.location.href = 'auth.html';
    return;
  }
  
  const meetups = {
    'spring-jan': 'Spring House Virtual Gathering',
    'portland-feb': 'Portland Triad Meetup',
    'fire-circle': 'Fire Circle Ritual'
  };
  
  alert(`✅ RSVP Confirmed!\n\nYou're registered for: ${meetups[meetupId]}\n\n- Calendar invite sent to ${user.email}\n- Zoom link will be emailed 1 hour before\n- Reminder notifications enabled`);
};

// Create Meetup
window.createMeetup = function() {
  if (!user) {
    alert('Please sign in to create meetups');
    window.location.href = 'auth.html';
    return;
  }
  
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal-content">
      <button class="modal-close" onclick="this.closest('.video-modal').remove()">×</button>
      <h2>📅 Create Meetup</h2>
      <form onsubmit="event.preventDefault(); submitMeetup(this);">
        <div class="form-group">
          <label>Meetup Title</label>
          <input type="text" name="title" required placeholder="e.g., Spring House Gathering">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea name="description" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label>Date & Time</label>
          <input type="datetime-local" name="datetime" required>
        </div>
        <div class="form-group">
          <label>Type</label>
          <select name="type" required>
            <option value="virtual">Virtual (Zoom/Video)</option>
            <option value="in-person">In-Person</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div class="form-group">
          <label>Location/Link</label>
          <input type="text" name="location" placeholder="Zoom link or physical address">
        </div>
        <div class="form-group">
          <label>House</label>
          <select name="house" required>
            <option value="spring">Spring House</option>
            <option value="summer">Summer House</option>
            <option value="fall">Fall House</option>
            <option value="winter">Winter House</option>
            <option value="all">All Houses</option>
          </select>
        </div>
        <button type="submit" class="btn-premium primary full-width">
          Create Meetup
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
};

function submitMeetup(form) {
  const formData = new FormData(form);
  alert(`✅ Meetup Created!\n\nTitle: ${formData.get('title')}\nType: ${formData.get('type')}\n\nYour meetup has been published to the community calendar!`);
  form.closest('.video-modal').remove();
}

// Schedule Call
window.scheduleCall = function() {
  alert('📞 Schedule Video Call\n\nFeatures:\n- Pick date & time\n- Select participants\n- Send calendar invites\n- Set reminders\n- Add to community calendar');
};

// Find Members
window.findMembers = function() {
  window.location.href = 'dashboard.html';
};

// View Calendar
window.viewCalendar = function() {
  alert('📅 Community Calendar\n\nView all upcoming:\n- Live sessions\n- Meetups\n- Workshops\n- House gatherings\n- Personal events\n\nSync with Google Calendar, iCal, Outlook');
};

// Toggle Chat Fullscreen
window.toggleChatFullscreen = function() {
  const chatWidget = document.querySelector('.chat-widget-premium');
  chatWidget.classList.toggle('fullscreen');
};

// Toggle Emoji Picker
window.toggleEmojiPicker = function() {
  alert('😊 Emoji Picker\n\nQuick access to:\n- Smileys & emotions\n- People & body\n- Animals & nature\n- Food & drink\n- Activities & events');
};

// Video Controls
window.toggleMic = function() {
  alert('🎤 Microphone toggled');
};

window.toggleCamera = function() {
  alert('📹 Camera toggled');
};

window.shareScreen = function() {
  alert('🖥️ Screen sharing started');
};

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
  .video-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 2rem;
    animation: fadeIn 0.3s ease;
  }

  .video-modal-content {
    background: var(--bg);
    border-radius: 24px;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .video-modal-content h2 {
    font-family: "Playfair Display", serif;
    color: var(--accent);
    margin: 0 0 1.5rem;
  }

  .video-modal-content .form-group {
    margin-bottom: 1.5rem;
  }

  .video-modal-content label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--accent);
    font-weight: 600;
  }

  .video-modal-content input,
  .video-modal-content textarea,
  .video-modal-content select {
    width: 100%;
    padding: 0.875rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    font-family: inherit;
    font-size: 0.95rem;
  }

  .video-modal.fullscreen {
    padding: 0;
  }

  .video-room {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #0a0a0a;
  }

  .video-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
  }

  .live-indicator {
    background: #ff4444;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-right: 1rem;
  }

  .video-controls {
    display: flex;
    gap: 0.75rem;
  }

  .control-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .control-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .control-btn.danger {
    background: #ff4444;
  }

  .video-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }

  .video-tile {
    background: #1a1a1a;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
  }

  .video-tile.main {
    grid-column: 1 / -1;
  }

  .video-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: #fff;
  }

  .avatar-large {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-strong), var(--accent));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
  }

  .video-label {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .video-chat {
    width: 350px;
    background: rgba(0, 0, 0, 0.9);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .video-chat .chat-header {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }

  .video-chat .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    color: #fff;
  }

  .video-chat .chat-msg {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
  }

  .video-chat .chat-msg strong {
    color: var(--accent-strong);
  }
`;
document.head.appendChild(modalStyles);
