import { basePlugin } from "./base";
import { codePlugin } from "./code";
import { listPlugin } from "./list";
import { pastePlugin } from "./paste";
import { hotkeyPlugin } from "./hotkeys";

export const plugins = [
  basePlugin,
  codePlugin,
  listPlugin,
  pastePlugin,
  hotkeyPlugin
];
