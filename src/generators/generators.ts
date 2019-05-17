import { MarkdownNode, PrismicNode, RichTextSpan, RichTextBlock } from "../types";
import { generate as heading } from "./heading";
import { generate as text } from "./text";
import { generate as paragraph } from "./paragraph";
import { generate as link } from "./link";
import { generate as definition } from "./definition";
import { generate as list } from "./list";
import { element } from "./formatting-element";

export type GeneratorFn<T extends PrismicNode> = (node: MarkdownNode) => T[];

export interface GeneratorCollection<T extends PrismicNode> {
  [key: string]: GeneratorFn<T>;
}

export const blocks: GeneratorCollection<RichTextBlock> = {
  heading,
  paragraph,
  definition,
  list
};

export const spans: GeneratorCollection<RichTextSpan> = {
  text,
  strong: element("strong"),
  emphasis: element("em"),
  link,
  linkReference: element("strong")
};  

export function runGenerator<T extends PrismicNode>(
  node: MarkdownNode,
  generators: { [key: string]: GeneratorFn<T> }
): T[] {
  if (!generators[node.type]) {
    throw new Error(`No generator of type "${node.type}" found!`);
  }

  return generators[node.type](node);
}