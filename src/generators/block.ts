import { IMarkdownNode, IRichTextBlock } from 'types';
import { transformChildren } from '../utils/transform-children';
import { GenerationResult } from './generators';

export const block = (type: string) => (node: IMarkdownNode, offset: number): GenerationResult<IRichTextBlock> => {
  const [spans, text, offsets] = transformChildren(node, offset);

  return [
    [
      {
        type,
        content: {
          text,
          spans,
        },
      },
    ],
    text,
    offsets,
  ];
};
