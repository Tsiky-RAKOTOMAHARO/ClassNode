import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//auth
export const authAPI = {
  login: (userName: string, userPassword: string) =>
    api.post('/auth/login', { userName, userPassword }),
};

//etudiant
export const etudiantAPI = {
  getAll: () => api.get('/etudiants'),
  getById: (numEt: number) => api.get(`/etudiants/${numEt}`),
  create: (data: {
    numEt: number;
    nom: string;
    prenom: string;
    note_math?: number;
    note_phys?: number;
  }) => api.post('/etudiants', data),
  update: (numEt: number, data: any) =>
    api.put(`/etudiants/${numEt}`, data),
  delete: (numEt: number) => api.delete(`/etudiants/${numEt}`),
  getStats: () => api.get('/etudiants/stats/all'),
};

export default api;
