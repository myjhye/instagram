import { createClient } from '@sanity/client';
import ImageUrlBuilder  from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-03-20',
  token: process.env.SANITY_SECRET_TOKEN,
});

// ImageUrlBuilder -> 이미지 url 생성
const builder = ImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  // builder -> 이미지 url 생성 -> 이미지 width 800 설정 -> url 반환
  return builder
    .image(source)
    .width(800)
    .url();
}

export const assetsURL = `https//${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/assets/images/${process.env.SANITY_DATASET}`;