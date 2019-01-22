import { basePlugin } from "./base";
import { blockCodePlugin } from "./blockCode";
import { listPlugin } from "./list";
import { pastePlugin } from "./paste";
import { hotkeyPlugin } from "./hotkeys";
import { linkPlugin } from "./link";
import { softBreakPlugin } from "./softBreak";
import { trailingBlockPlugin } from "./trailingBlock";
import { inlineCodePlugin } from "./inlineCode";
import { imagePlugin } from "./image";

export const plugins = [
  blockCodePlugin,
  inlineCodePlugin,
  listPlugin,
  pastePlugin,
  hotkeyPlugin,
  softBreakPlugin,
  trailingBlockPlugin,
  linkPlugin,
  imagePlugin,
  basePlugin
];
