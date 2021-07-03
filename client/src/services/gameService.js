import axios from 'axios';

export default {
  getGameById: async (id) => {
    let res = await axios.get(`/api/game/${id}`);
    return res.data || [];
  }
}