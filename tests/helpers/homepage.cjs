const assert = require("node:assert/strict");

const fs = require("node:fs");

const vm = require("node:vm");

const ts = require("typescript");

// Execute the source with isolated service adapters. No remote database writes.
function loadSource(file, mocks = {}, env = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(
    code,
    {
      exports,
      process: { env },
      require: (name) =>
        Object.hasOwn(mocks, name) ? mocks[name] : require(name),
    },
    { filename: file },
  );
  return exports;
}

function subscriberAction(
  connectToDatabase,
  create,
  revalidatePath = () => {},
) {
  const { SubscriberFormSchema } = loadSource("lib/validations.ts", {
    "./utils": { validateDate: () => true },
  });
  return loadSource("lib/actions/subscriber.action.ts", {
    "@/database/subscriber": { create },
    "../mongoose": { connectToDatabase },
    "next/cache": { revalidatePath },
    "../validations": { SubscriberFormSchema },
  }).addSubscriber;
}

function subscriberForm(action) {
  const React = require("react");
  let submit;
  let resets = 0;
  const notices = [];
  const states = [];
  const component = () => null;
  const { default: Subscriber } = loadSource(
    "components/forms/Subscriber.tsx",
    {
      react: {
        ...React,
        useState: (value) => [value, (next) => states.push(next)],
      },
      "react-hook-form": {
        useForm: () => ({
          handleSubmit: (fn) => {
            submit = fn;
            return fn;
          },
          reset: () => resets++,
        }),
      },
      "@/lib/validations": {
        SubscriberFormSchema: require("zod").z.object({
          email: require("zod").z.string().email(),
        }),
      },
      "@/lib/utils": { cn: (x) => x },
      "@/components/ui/button": { Button: component },
      "@/components/ui/form": Object.fromEntries(
        [
          "Form",
          "FormControl",
          "FormField",
          "FormItem",
          "FormLabel",
          "FormMessage",
        ].map((name) => [name, component]),
      ),
      "@/components/ui/input": { Input: component },
      "@/lib/actions/subscriber.action": { addSubscriber: action },
      "next/navigation": { usePathname: () => "/" },
      "../ui/use-toast": { toast: (value) => notices.push(value) },
    },
  );
  Subscriber({ type: "" });
  return {
    submit: (values) => submit(values),
    states,
    notices,
    resets: () => resets,
  };
}

module.exports = { loadSource, subscriberAction, subscriberForm };
