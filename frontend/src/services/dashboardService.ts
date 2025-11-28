import api from './api';

export interface DashboardStats {
  totalLivros: number;
  totalUsuarios: number;
  emprestimosAtivos: number;
  livrosDisponiveis: number;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
};