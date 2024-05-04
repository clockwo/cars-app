import axios, { AxiosError } from 'axios';
import type { Vehicle } from '@/interfaces/vehicle.interface';
const PREFIX = 'https://test.tspb.su/test-task';

export const getVehicles = async () => {
  try {
    const { data } = await axios.get<Vehicle[]>(`${PREFIX}/vehicles`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
    }
  }
};
