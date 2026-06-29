import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authAPI } from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ userId: number; userName: string } | null>(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (userName: string, userPassword: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await authAPI.login(userName, userPassword);
      user.value = response.data;
      isAuthenticated.value = true;
      localStorage.setItem('user', JSON.stringify(user.value));
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur de connexion';
      isAuthenticated.value = false;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('user');
  };

  const restoreSession = () => {
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
    error,
    login,
    logout,
    restoreSession,
  };
});
