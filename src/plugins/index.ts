import { Plugin } from "slate-react";
import { basePlugin } from "./base";
import { codePlugin } from "./code";
import { listPlugin } from "./list";
import { pastePlugin } from "./paste";
import { hotkeyPlugin } from "./hotkeys";
import { linkPlugin } from "./link";
import { softBreakPlugin } from "./break";
import { trailingBlockPlugin } from "./trailing";

export const plugins: Plugin[] = [
  codePlugin,
  listPlugin,
  pastePlugin,
  hotkeyPlugin,
  softBreakPlugin,
  trailingBlockPlugin,
  linkPlugin,
  basePlugin
];
