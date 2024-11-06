import { ILogin } from "./ILogin";

export async function login(payload: ILogin, urlPath: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_AUTH_URL + urlPath;
  try {

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    return response.json();

  } catch (error) {

    console.log('Erro interno ao processar usuário.');
  }
}