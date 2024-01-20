// Importez les modules nécessaires
import { getAccessToken } from '../../../../utils/sessionTokenAccessor';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const session = await getServerSession(authOptions);

  // Extract id from the URL
  const id = req.url.match(/\/api\/get-room-id\/(\d+)/)[1];

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID is missing' }, { status: 400 });
    }

    if (session) {
      const url = `${process.env.BACKEND_API_ENDPOINT}/api/rooms/${id}`;
      const accessToken = await getAccessToken();

      const resp = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        method: 'GET',
      });

      if (resp.ok) {
        const data = await resp.json();
        console.log('Data from backend:', data);
        return NextResponse.json({ data }, { status: resp.status });
      } else {
        const errorData = await resp.text();
        return NextResponse.json({ error: errorData }, { status: resp.status });
      }
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
