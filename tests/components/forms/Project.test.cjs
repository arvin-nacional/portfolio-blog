const { test } = require("@jest/globals");
const assert = require("node:assert/strict");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { loadSource } = require("../../helpers/homepage.cjs");

const { ProjectSchema } = loadSource("lib/validations.ts", {
  "./utils": { validateDate: () => true },
});

test("project validation accepts the reported software tags and uploaded photo IDs", async () => {
  const values = {
    title: "Example project",
    content: "Project description",
    category: ["Web"],
    softwareUsed: ["PayloadCMS", "Javascript/TypeScript", "Figma"],
    mainImage: "data:image/png;base64,abc",
    images: [
      {
        src: "data:image/png;base64,abc",
        alt: "Example",
        _id: require("node:crypto").randomUUID(),
      },
    ],
    clientName: "Example client",
    dateFinished: "10/08/2026",
    url: "",
  };
  const { zodResolver } = require("@hookform/resolvers/zod");
  const result = await zodResolver(ProjectSchema)(values, {}, { fields: {} });
  assert.deepEqual(Object.keys(result.errors), []);
  assert.equal(
    ProjectSchema.shape.softwareUsed.safeParse(["a".repeat(30)]).success,
    true,
  );
  assert.equal(
    ProjectSchema.shape.softwareUsed.safeParse(["a".repeat(31)]).success,
    false,
  );
});

test("array field validation displays the software error instead of undefined", () => {
  const { FormField, FormItem, FormMessage } = loadSource(
    "components/ui/form.tsx",
    {
      "@/lib/utils": { cn: (...values) => values.filter(Boolean).join(" ") },
      "@/components/ui/label": { Label: "label" },
      "react-hook-form": {
        Controller: ({ render }) => render(),
        useFormContext: () => ({
          getFieldState: () => ({
            error: [
              {
                type: "too_big",
                message: "Software name must be at most 30 characters.",
              },
            ],
          }),
          formState: {},
        }),
      },
    },
  );
  const markup = renderToStaticMarkup(
    React.createElement(FormField, {
      name: "softwareUsed",
      render: () =>
        React.createElement(FormItem, null, React.createElement(FormMessage)),
    }),
  );
  assert.match(markup, /Software name must be at most 30 characters/);
  assert.doesNotMatch(markup, /undefined/);
});

test("category and software controls attach accessibility props to their inputs", () => {
  const form = loadSource("components/ui/form.tsx", {
    "@/lib/utils": { cn: (...values) => values.filter(Boolean).join(" ") },
    "@/components/ui/label": { Label: "label" },
  });
  const { default: Project } = loadSource("components/forms/Project.tsx", {
    "../ui/form": form,
    "@/components/ui/button": { Button: "button" },
    "@/components/ui/input": { Input: "input" },
    "@/components/ui/tooltip": {},
    "@tinymce/tinymce-react": { Editor: () => null },
    "../ui/badge": { Badge: "span" },
    "next/navigation": {
      useRouter: () => ({}),
      usePathname: () => "/projects/add",
    },
    "next/image": { default: "img" },
    "@/lib/validations": { ProjectSchema },
    "@/lib/actions/project.action": {},
    "@/lib/utils": { formatDateInput: () => "" },
  });
  const markup = renderToStaticMarkup(React.createElement(Project));
  for (const name of ["category", "softwareUsed"]) {
    const input = markup.match(
      new RegExp(`<input[^>]*name="${name}"[^>]*>`),
    )?.[0];
    assert.ok(input, `${name} input is rendered`);
    assert.match(input, /id="[^"]+-form-item"/);
    assert.match(input, /aria-describedby="[^"]+-form-item-description"/);
    assert.match(input, /aria-invalid="false"/);
  }
});
