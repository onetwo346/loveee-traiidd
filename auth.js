// Tab switching
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

authTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.dataset.tab;
    
    authTabs.forEach(t => t.classList.remove('active'));
    authForms.forEach(f => f.classList.remove('active'));
    
    tab.classList.add('active');
    document.getElementById(`${targetTab}-form`).classList.add('active');
  });
});

// Sign In
document.getElementById('signin-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  const remember = document.getElementById('remember-me').checked;
  
  // Simulate authentication
  const user = {
    email: email,
    name: email.split('@')[0],
    house: 'spring',
    joinedDate: new Date().toISOString(),
    posts: 0,
    replies: 0,
    likes: 0
  };
  
  localStorage.setItem('lovetriad_user', JSON.stringify(user));
  if (remember) {
    localStorage.setItem('lovetriad_remember', 'true');
  }
  
  window.location.href = 'dashboard.html';
});

// Sign Up
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const house = document.getElementById('house-select').value;
  
  if (password !== confirm) {
    alert('Passwords do not match!');
    return;
  }
  
  // Create user account
  const user = {
    name: name,
    email: email,
    house: house,
    joinedDate: new Date().toISOString(),
    posts: 0,
    replies: 0,
    likes: 0,
    bio: '',
    location: ''
  };
  
  localStorage.setItem('lovetriad_user', JSON.stringify(user));
  
  window.location.href = 'dashboard.html';
});
