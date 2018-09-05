import { Plugin } from "slate-react";
import { basePlugin } from "./base";
import { blockCodePlugin } from "./blockCode";
import { listPlugin } from "./list";
import { pastePlugin } from "./paste";
import { hotkeyPlugin } from "./hotkeys";
import { linkPlugin } from "./link";
import { softBreakPlugin } from "./softBreak";
import { trailingBlockPlugin } from "./trailingBlock";
import { inlineCodePlugin } from "./inlineCode";

export const plugins: Plugin[] = [
  blockCodePlugin,
  inlineCodePlugin,
  listPlugin,
  pastePlugin,
  hotkeyPlugin,
  softBreakPlugin,
  trailingBlockPlugin,
  linkPlugin,
  basePlugin
];
