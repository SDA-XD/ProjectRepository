const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Use absolute path
const usersFile = path.join(__dirname, 'users.json');

// Initialize if doesn't exist
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, '[]');
  console.log('Created users.json');
}

// Read users
const getUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Save users
const saveUsers = (users) => {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    console.log('Saved users to file');
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// SIGNUP
app.post('/api/signup', (req, res) => {
  console.log('📝 Signup request received:', req.body);

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already exists' });
  }

  const newUser = { name, email, password, role: role || 'citizen' };
  users.push(newUser);
  saveUsers(users);

  console.log('✅ User created:', email);
  res.json({ success: true, message: 'Account created!', user: { name, email, role: newUser.role } });
});

// LOGIN
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password && u.role === role);

  if (user) {
    res.json({ success: true, name: user.name, email, role: user.role });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// UPDATE PROFILE
app.put('/api/user/update', (req, res) => {
  const { currentEmail, newEmail, name } = req.body;
  const users = getUsers();
  const idx = users.findIndex(u => u.email === currentEmail);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  users[idx].email = newEmail;
  users[idx].name = name;
  saveUsers(users);

  res.json({ success: true, user: { name, email: newEmail, role: users[idx].role } });
});

// ✅ GET USERS (Admin View — includes user count & role stats)
app.get('/api/users', (req, res) => {
  const users = getUsers();

  // Calculate breakdown by role
  const roleBreakdown = users.reduce((acc, user) => {
    const role = user.role || 'citizen';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    totalUsers: users.length,
    roleBreakdown,
    users: users.map(({ password, ...u }) => u) // Hide passwords
  });
});

// ✅ LEGAL EXPERT Q&A SECTION
const questionsFile = path.join(__dirname, 'questions.json');

// create file if missing
if (!fs.existsSync(questionsFile)) {
  fs.writeFileSync(questionsFile, '[]');
  console.log('Created questions.json');
}

const getQuestions = () => {
  try {
    return JSON.parse(fs.readFileSync(questionsFile, 'utf-8'));
  } catch {
    return [];
  }
};

const saveQuestions = (data) => {
  fs.writeFileSync(questionsFile, JSON.stringify(data, null, 2));
};

// Citizen asks a question
app.post('/api/questions', (req, res) => {
  const { name, email, question } = req.body;
  if (!question) return res.status(400).json({ success: false, message: 'Question is required' });

  const all = getQuestions();
  const newQ = { id: Date.now(), name, email, question, answer: '' };
  all.push(newQ);
  saveQuestions(all);
  res.json({ success: true, message: 'Question submitted', data: newQ });
});

// Expert fetches all questions
app.get('/api/questions', (req, res) => {
  res.json({ success: true, data: getQuestions() });
});

// Expert answers a question
app.put('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  const all = getQuestions();
  const idx = all.findIndex(q => q.id == id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Question not found' });

  all[idx].answer = answer;
  saveQuestions(all);
  res.json({ success: true, message: 'Answer saved', data: all[idx] });
});

app.listen(5000, () => {
  console.log('\n✅ Server running on port 5000');
  console.log(`📁 Database file: ${usersFile}\n`);
});
