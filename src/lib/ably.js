import * as Ably from 'ably';

let ablyClient = null;

export const getAblyClient = () => {
  if (!ablyClient) {
    ablyClient = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
      clientId: typeof window !== 'undefined' ? `user-${Date.now()}` : 'server',
    });
  }
  return ablyClient;
};

export const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
