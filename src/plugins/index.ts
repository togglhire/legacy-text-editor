import { Plugin } from "slate-react";
import { basePlugin } from "./base";
import { codePlugin } from "./code";
import { listPlugin } from "./list";
import { pastePlugin } from "./paste";
import { hotkeyPlugin } from "./hotkeys";
import { linkPlugin } from "./link";

export const plugins: Plugin[] = [
  codePlugin,
  listPlugin,
  pastePlugin,
  hotkeyPlugin,
  linkPlugin,
  basePlugin
];
