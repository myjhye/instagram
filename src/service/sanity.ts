import { createClient } from '@sanity/client';
import ImageUrlBuilder  from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

/*
@sanity/image-url
- 이미지 url 생성 : 원본 이미지를 기반으로 이미지 url 생성. 이미지의 사이즈, 형식, 해상도 지정 가능.
- 이미지 변환 : 이미지를 원하는 사이즈로 조정하거나 다른 형식으로 변환 가능. 원하는 폭과 높이 조절. 이미지 포맷(jpeg, png..)으로 변환.
*/


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
    .format('png')
    .url();
}

export const assetsURL = `https//${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/assets/images/${process.env.SANITY_DATASET}`;