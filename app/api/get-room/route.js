// Importez les modules nécessaires
import { getAccessToken } from '../../../utils/sessionTokenAccessor';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      let url = `${process.env.BACKEND_API_ENDPOINT}/api/rooms`;
      let accessToken = await getAccessToken();

      const resp = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        method: 'GET',
      });

      if (resp.ok) {
        const data = await resp.json();
        return NextResponse.json({ data }, { status: resp.status });
      } else {
        const errorData = await resp.text();
        return NextResponse.json({ error: errorData }, { status: resp.status });
      }
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
}
