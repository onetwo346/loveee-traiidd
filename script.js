const header = document.getElementById('header');
const scrollToTopBtn = document.getElementById('scrollToTop');

// Check if user is logged in and update nav
window.user = JSON.parse(localStorage.getItem('lovetriad_user'));
const user = window.user;
const authNavItem = document.getElementById('auth-nav-item');

if (user && authNavItem) {
  authNavItem.innerHTML = `
    <a href="dashboard.html" class="btn primary" style="padding: 0.5rem 1.25rem; font-size: 0.9rem; margin-right: 0.5rem;">Dashboard</a>
    <a href="javascript:void(0);" id="logout-btn" style="padding: 0.5rem 1.25rem; font-size: 0.9rem; color: var(--accent-strong); font-weight: 600; text-decoration: none; border: 2px solid var(--accent-strong); border-radius: 8px; transition: all 0.3s ease; display: inline-block;" onmouseover="this.style.background='var(--accent-strong)'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='var(--accent-strong)';" onclick="localStorage.clear(); sessionStorage.clear(); window.location.href='Index.html'; return false;">Logout</a>
  `;
}

// Toggle Community Hub content based on login state
const communityLoggedOut = document.getElementById('community-logged-out');
const communityLoggedIn = document.getElementById('community-logged-in');

if (user && communityLoggedIn && communityLoggedOut) {
  communityLoggedOut.style.display = 'none';
  communityLoggedIn.style.display = 'block';
  
  // Set user avatar
  const composerAvatar = document.getElementById('composer-avatar');
  if (composerAvatar) {
    composerAvatar.textContent = user.name.charAt(0).toUpperCase();
  }
}

// Create Post function
window.createPost = function() {
  if (!user) {
    alert('Please sign in to post');
    return;
  }

  const postText = document.getElementById('new-post').value.trim();
  const postHouse = document.getElementById('post-house').value;
  
  if (!postText) {
    alert('Please write something to post');
    return;
  }

  const houseNames = {
    all: 'All Houses',
    spring: 'Spring House',
    summer: 'Summer House',
    fall: 'Fall House',
    winter: 'Winter House'
  };

  const post = {
    id: Date.now(),
    author: user.name,
    authorAvatar: user.name.charAt(0).toUpperCase(),
    house: houseNames[postHouse],
    content: postText,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0
  };

  // Add post to feed
  const feedPosts = document.getElementById('feed-posts');
  const postHTML = `
    <div class="feed-post" style="animation: fadeInUp 0.5s ease;">
      <div class="post-header">
        <div class="post-avatar">${post.authorAvatar}</div>
        <div class="post-info">
          <strong>${post.author}</strong>
          <span class="post-meta">${post.house} • Just now</span>
        </div>
      </div>
      <div class="post-content">
        <p>${post.content}</p>
      </div>
      <div class="post-actions">
        <button class="post-action">💬 0 comments</button>
        <button class="post-action">❤️ 0 likes</button>
        <button class="post-action">🔗 Share</button>
      </div>
    </div>
  `;

  feedPosts.insertAdjacentHTML('afterbegin', postHTML);

  // Clear form
  document.getElementById('new-post').value = '';

  // Update user stats
  user.posts = (user.posts || 0) + 1;
  localStorage.setItem('lovetriad_user', JSON.stringify(user));

  // Scroll to new post
  feedPosts.firstElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// Send Chat Message function
window.sendChatMessage = function() {
  if (!user) {
    alert('Please sign in to chat');
    return;
  }

  const chatInput = document.getElementById('chat-message');
  const message = chatInput.value.trim();
  
  if (!message) return;

  const quickChat = document.getElementById('quick-chat');
  const messageHTML = `
    <div class="chat-message" style="animation: fadeIn 0.3s ease;">
      <strong>You:</strong> ${message}
    </div>
  `;

  quickChat.insertAdjacentHTML('beforeend', messageHTML);
  chatInput.value = '';

  // Scroll to bottom
  quickChat.scrollTop = quickChat.scrollHeight;

  // Simulate response after 2 seconds
  setTimeout(() => {
    const responses = [
      'That sounds wonderful!',
      'I\'d love to hear more about that',
      'Count me in!',
      'Great idea!',
      'Thanks for sharing!'
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const responseHTML = `
      <div class="chat-message" style="animation: fadeIn 0.3s ease;">
        <strong>Community:</strong> ${randomResponse}
      </div>
    `;
    quickChat.insertAdjacentHTML('beforeend', responseHTML);
    quickChat.scrollTop = quickChat.scrollHeight;
  }, 2000);
};

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
    scrollToTopBtn.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      if (entry.target.classList.contains('animate-slide')) {
        entry.target.style.transform = 'translateX(0)';
      } else {
        entry.target.style.transform = 'translateY(0)';
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-in, .animate-slide').forEach(el => {
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const modalIds = ['#spring-house', '#summer-house', '#fall-house', '#winter-house', '#human-molecule'];
    
    if (modalIds.includes(href)) {
      e.preventDefault();
      openModal(href.substring(1));
    } else {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

function openModal(modalId) {
  // Handle both formats: 'spring-house' and 'spring-house-modal'
  let modal = document.getElementById(modalId);
  if (!modal) {
    modal = document.getElementById(modalId + '-modal');
  }
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

window.openModal = openModal;

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.closeModal = closeModal;

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal(e.target.id);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => {
      closeModal(modal.id);
    });
  }
});
