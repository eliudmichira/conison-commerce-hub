import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth';
import { userService } from '../services/userService';

export const authService = {
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

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
      await signOut(auth);
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