import { Layout } from '../../../../src/type';

interface ImgItem {
  title: string;
  model: Layout;
}

export const config: ImgItem[] = [
  {
    title: '线性渐变',
    model: {
      width: 200,
      height: 200,
      elements: [
        {
          type: 'rect',
          top: 0,
          left: 0,
          width: 500,
          height: 500,
          style: {
            startX: 0,
            startY: 0,
            endX: 500,
            endY: 500,
            stops: [
              [0, 'red'],
              [0.5, 'blue'],
              [1, 'green'],
            ],
          },
        },
      ],
    },
  },
  {
    title: '辐射渐变',
    model: {
      width: 200,
      height: 200,
      elements: [
        {
          type: 'rect',
          top: 0,
          left: 0,
          width: 200,
          height: 200,
          style: {
            startX: 100,
            startY: 100,
            endX: 100,
            endY: 100,
            startRadius: 200,
            endRadius: 50,
            stops: [
              [0, 'red'],
              [0.5, 'blue'],
              [1, 'green'],
            ],
          },
        },
      ],
    },
  },
  {
    title: '图片重复',
    model: {
      width: 400,
      height: 400,
      elements: [
        {
          type: 'rect',
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          style: {
            image:
              'https://gd-filems.dancf.com/mcm79j/mcm79j/75617/926696bc-8b64-49e0-b6d5-6935fb73b80b18349186.png',
            mode: 'repeat',
          },
        },
      ],
    },
  },
  {
    title: '增加边框',
    model: {
      width: 400,
      height: 250,
      elements: [
        {
          type: 'image',
          top: 0,
          left: 0,
          width: 400,
          url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/75617/563b3841-1e32-4417-a2f1-45be815614ed9309403.png',
        },
        {
          type: 'rect',
          top: 0,
          left: 0,
          lineWidth: 20,
          width: 400,
          height: 250,
          style: 'red',
        },
      ],
    },
  },
  {
    title: '渐变边框',
    model: {
      width: 400,
      height: 250,
      elements: [
        {
          type: 'image',
          top: 0,
          left: 0,
          width: 400,
          url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/75617/563b3841-1e32-4417-a2f1-45be815614ed9309403.png',
        },
        {
          type: 'rect',
          top: 0,
          left: 0,
          lineWidth: 40,
          width: 400,
          height: 250,
          style: {
            startX: 0,
            startY: 0,
            endX: 500,
            endY: 500,
            stops: [
              [0, 'red'],
              [0.5, 'blue'],
              [1, 'green'],
            ],
          },
        },
      ],
    },
  },
  {
    title: '图片边框',
    model: {
      width: 400,
      height: 250,
      elements: [
        {
          type: 'image',
          top: 0,
          left: 0,
          width: 400,
          url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/75617/563b3841-1e32-4417-a2f1-45be815614ed9309403.png',
        },
        {
          type: 'rect',
          top: 0,
          left: 0,
          lineWidth: 100,
          width: 400,
          height: 250,
          style: 'green',
        },
        {
          type: 'rect',
          top: 0,
          left: 0,
          lineWidth: 100,
          width: 400,
          height: 250,
          style: {
            image:
              'https://gd-filems.dancf.com/mcm79j/mcm79j/75617/926696bc-8b64-49e0-b6d5-6935fb73b80b18349186.png',
            mode: 'repeat',
          },
        },
      ],
    },
  },
];
