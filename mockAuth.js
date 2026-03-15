
const USERS_KEY = "lh_registered_users";

function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRegisteredUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {}
}

const mockAuth = {


  getUser: () => {
    try { return JSON.parse(localStorage.getItem("lh_user")); }
    catch { return null; }
  },

  login: (email, password, role) => {
    const users = getRegisteredUsers();

    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      throw new Error("No account found with this email. Please register first.");
    }

    if (found.password !== password) {
      throw new Error("Invalid email or password. Please try again.");
    }

    if (found.role !== role) {
      throw new Error(
        `This account is registered as ${found.role.charAt(0) + found.role.slice(1).toLowerCase()}, not ${role.charAt(0) + role.slice(1).toLowerCase()}. Please select the correct role.`
      );
    }
    const user = { id: found.id, name: found.name, email: found.email, role: found.role };
    localStorage.setItem("lh_user", JSON.stringify(user));
    localStorage.setItem("lh_token", "mock_jwt_" + found.id);
    return user;
  },
  register: (name, email, password, role) => {
    const users = getRegisteredUsers();

    const alreadyExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (alreadyExists) {
      throw new Error("An account with this email already exists. Please sign in instead.");
    }
    const newUser = {
      id:       Date.now(),
      name:     name.trim(),
      email:    email.trim().toLowerCase(),
      password, 
      role,
    };

    users.push(newUser);
    saveRegisteredUsers(users);
    const user = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    localStorage.setItem("lh_user", JSON.stringify(user));
    localStorage.setItem("lh_token", "mock_jwt_" + newUser.id);
    return user;
  },
  logout: () => {
    localStorage.removeItem("lh_user");
    localStorage.removeItem("lh_token");
  },

  isAuth: () => !!localStorage.getItem("lh_token"),

  getAllUsers: () => getRegisteredUsers().map(u => ({
    id: u.id, name: u.name, email: u.email, role: u.role,
  })),
};

export default mockAuth;
