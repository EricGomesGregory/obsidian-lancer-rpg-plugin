import { parseYaml, type MarkdownPostProcessorContext } from "obsidian";
import * as Database from "src/database";

import ProgressClockUI from "./components/ProgressClock.svelte";
import { mount } from "svelte";


type Context = MarkdownPostProcessorContext;

export interface ProgressClockData {
  name: string
  sides: 2 | 4 | 6 | 8 | 10 | 12
  progress: number
}

export async function ProgressClock(database: Database.Client, source: string, element: HTMLElement, context: Context,
  onUpdate: (data: ProgressClockData) => void
) {
  const clockData = parseYaml(source) as ProgressClockData;

  mount(ProgressClockUI, {
    target: element,
    props: {
      data: clockData,
      update: (progress) => { 
        clockData.progress = progress;
        onUpdate(clockData);
      }
    }
  });
}