/**
 * Fetches random dog image urls from the dog.ceo API.
 *
 * Falls back to `placeholder:<n>` entries when the API is unreachable or
 * returns an error / fewer images than requested, so the demo can still
 * build offline with gradient placeholder cards.
 */
export async function fetchDogImages(count: number): Promise<string[]> {
  const images: string[] = [];

  try {
    const response = await fetch(`https://dog.ceo/api/images/random/${count}`);
    const data = (await response.json()) as { status: string; message: string | string[] };

    if (data.status === 'success' && Array.isArray(data.message)) {
      images.push(...data.message);
    }
  } catch {
    // network failure — fall through to placeholders
  }

  while (images.length < count) {
    images.push(`placeholder:${images.length}`);
  }

  return images;
}
