export const customFetch = async (path: string, authorization: string, method: string = "GET", body: any = null): Promise<any> => {
    const response = await fetch(`https://api.invezgo.com/${path}`, {
        headers: {
          "accept": "application/json", 
          "accept-language": "id",
          "authorization": `Bearer ${authorization}`,
          "Referer": "https://invezgo.com/"
        },
        body: body,
        method: method
      });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}
