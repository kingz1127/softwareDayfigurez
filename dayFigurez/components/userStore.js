// Simple in-memory user store shared between Register and Login
const userStore = {
  users: [],

  register(userData) {
    const exists = this.users.find(u => u.email === userData.email);
    if (exists) return { success: false, message: 'An account with this email already exists.' };
    this.users.push({ ...userData });
    return { success: true };
  },

  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) return { success: true, user };
    return { success: false, message: 'Invalid email or password.' };
  },

  updatePassword(email, newPassword) {
    const user = this.users.find(u => u.email === email);
    if (user) {
      user.password = newPassword;
      return { success: true };
    }
    return { success: false, message: 'User not found.' };
  },

  emailExists(email) {
    return this.users.some(u => u.email === email);
  },
};

export default userStore;