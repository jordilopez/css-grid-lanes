import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchDogImages } from '../src/lib/dogs';

const sampleResponse = {
  status: 'success',
  message: [
    'https://images.dog.ceo/breeds/hound/n01.jpg',
    'https://images.dog.ceo/breeds/pug/n02.jpg',
  ],
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('fetchDogImages', () => {
  it('returns image urls from the dog.ceo api', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(sampleResponse),
      }),
    );

    const images = await fetchDogImages(2);

    expect(images).toEqual([
      'https://images.dog.ceo/breeds/hound/n01.jpg',
      'https://images.dog.ceo/breeds/pug/n02.jpg',
    ]);
    expect(fetch).toHaveBeenCalledWith(
      'https://dog.ceo/api/breeds/image/random/2',
    );
  });

  it('falls back to placeholder cards when the api request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network down')),
    );

    const images = await fetchDogImages(3);

    expect(images).toHaveLength(3);
    expect(images.every((url) => url.startsWith('placeholder:'))).toBe(true);
  });

  it('falls back to placeholder cards when the api reports an error status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ status: 'error', message: 'boom' }),
      }),
    );

    const images = await fetchDogImages(2);

    expect(images).toHaveLength(2);
    expect(images.every((url) => url.startsWith('placeholder:'))).toBe(true);
  });

  it('falls back when the api returns fewer images than requested', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            status: 'success',
            message: ['https://images.dog.ceo/only-one.jpg'],
          }),
      }),
    );

    const images = await fetchDogImages(3);

    expect(images).toHaveLength(3);
    expect(images[0]).toBe('https://images.dog.ceo/only-one.jpg');
  });
});
