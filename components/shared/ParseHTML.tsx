import "server-only";
import parse, { Element, Text } from "html-react-parser";
import "@/styles/prism.css";

export default async function ParseHTML({ data, styles = "" }: { data: string; styles?: string }) {
  const Prism = /language-[\w-]+/.test(data) ? (await import("@/lib/highlight-code")).default : null;
  return <div className={`markdown min-w-0 w-full ${styles}`}>{parse(data, {
    replace(node) {
      if (!Prism || !(node instanceof Element) || node.name !== "code") return;
      const language = /language-([\w-]+)/.exec(node.attribs.class || "")?.[1];
      if (!language || !Prism.languages[language]) return;
      const text = (items: typeof node.children): string => items.map(item => item instanceof Text ? item.data : item instanceof Element ? text(item.children) : "").join("");
      return <code className={node.attribs.class} dangerouslySetInnerHTML={{ __html: Prism.highlight(text(node.children), Prism.languages[language], language) }} />;
    },
  })}</div>;
}
