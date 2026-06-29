import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authAPI } from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ userId: number; userName: string } | null>(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const messageErreur = ref<string | null>(null);

  const connecter = async (userName: string, userPassword: string) => {
    loading.value = true;
    messageErreur.value = null;
    try {
      const response = await authAPI.login(userName, userPassword);
      user.value = response.data;
      isAuthenticated.value = true;
      localStorage.setItem('user', JSON.stringify(user.value));
      return true;
    } catch (err: any) {
      messageErreur.value = err.response?.data?.message || 'Erreur de connexion';
      isAuthenticated.value = false;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deconnecter = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('user');
  };

  const restaurerSession = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
      isAuthenticated.value = true;
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    messageErreur,
    connecter,
    deconnecter,
    restaurerSession,
  };
});
