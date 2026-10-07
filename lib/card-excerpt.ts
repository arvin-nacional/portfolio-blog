import { htmlToDOM } from "html-react-parser";

type ExcerptNode = { type: string; data?: string; children?: ExcerptNode[] };

export function getCardExcerpt(html: string, limit = 220): string {
  const textFromNode = (node: ExcerptNode): string => {
    if (node.type === "text") return node.data || "";
    if (node.children) return node.children.map(textFromNode).join(" ");
    return "";
  };
  const text = htmlToDOM(
    html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ""),
  )
    .map(textFromNode)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= limit) return text;
  const clipped = text.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > limit / 2 ? lastSpace : limit)}…`;
}
