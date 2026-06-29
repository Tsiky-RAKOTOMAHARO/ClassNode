import { defineStore } from 'pinia';
import { ref } from 'vue';
import { etudiantAPI } from '../services/api';

export const useEtudiantStore = defineStore('etudiant', () => {
  const etudiants = ref<any[]>([]);
  const stats = ref<any>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const getAllEtudiants = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await etudiantAPI.getAll();
      etudiants.value = response.data;
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors de la récupération';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getEtudiantById = async (numEt: number) => {
    try {
      const response = await etudiantAPI.getById(numEt);
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Étudiant non trouvé';
      throw err;
    }
  };

  const createEtudiant = async (data: any) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await etudiantAPI.create(data);
      await getAllEtudiants(); // Rafraîchir la liste
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors de la création';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateEtudiant = async (numEt: number, data: any) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await etudiantAPI.update(numEt, data);
      await getAllEtudiants(); // Rafraîchir la liste
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors de la modification';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteEtudiant = async (numEt: number) => {
    loading.value = true;
    error.value = null;
    try {
      await etudiantAPI.delete(numEt);
      await getAllEtudiants(); // Rafraîchir la liste
      return { message: 'Étudiant supprimé' };
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors de la suppression';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getStats = async () => {
    try {
      const response = await etudiantAPI.getStats();
      stats.value = response.data;
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors du calcul des stats';
      throw err;
    }
  };

  return {
    etudiants,
    stats,
    loading,
    error,
    getAllEtudiants,
    getEtudiantById,
    createEtudiant,
    updateEtudiant,
    deleteEtudiant,
    getStats,
  };
});
