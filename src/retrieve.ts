export async function retrieve<T>(key: string, id: number | null | undefined): Promise<T | undefined> {
  try {
    let resourceUrl = key;
    if (id !== null) {
      resourceUrl = resourceUrl.concat(`/${id}`);
    }
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + resourceUrl);
    if (response.ok) {
      const data = await response.json();
      return data as T;
    }
  } catch (error) {
    console.error(error.message);
  }
}

export interface RetrieverFunction<T> {
  (key: string, id: number | undefined): Promise<T | undefined>;
}