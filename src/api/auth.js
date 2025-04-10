import { auth } from '../firebase/config';
import { userService } from '../services/userService';

export const authService = {
  login: async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const userData = await userService.getUserById(userCredential.user.uid);
      return {
        ...userCredential.user,
        ...userData
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  register: async (email, password, name, role = 'client', company = null) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName: name });

      const userData = {
        uid: userCredential.user.uid,
        email,
        name,
        role,
        company,
        createdAt: new Date().toISOString()
      };

      await userService.createAdmin(userData);
      return {
        ...userCredential.user,
        ...userData
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCurrentUser: async () => {
    try {
      const user = auth.currentUser;
      if (!user) return null;
      
      const userData = await userService.getUserById(user.uid);
      return {
        ...user,
        ...userData
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}; 