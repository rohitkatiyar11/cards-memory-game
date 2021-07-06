import axios from 'axios';

export default {
  getGameById: async (id) => {
    let res = await axios.get(`/api/game/${id}`);
    return res.data || [];
  },
  createGame: async (payload) => {
    let res = await axios.post(`/api/game/`, payload);
    return res.data || [];
  },
  updateGame: async (id, payload) => {
    let res = await axios.put(`/api/game/${id}`, payload);
    return res.data || [];
  }
}