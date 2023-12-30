import {
  component$,
  useStylesScoped$,
  useSignal,
  useVisibleTask$,
  type Signal,
  Slot,
} from "@builder.io/qwik";
import styles from "./forms.css?inline";
import wordStyles from "./word.css?inline";
import pageStyles from "./page.css?inline";

import { colors, data } from "../data.ts";

export const App = component$(() => {
  const localData = useSignal(data);
  return (
    <>
      <Forms localData={localData} />
      <RenderedWords localData={localData} />
    </>
  );
});

export const Forms = component$(
  ({ localData }: { localData: Signal<typeof data> }) => {
    useStylesScoped$(styles);

    useVisibleTask$(
      () => {
        const dataAfterHydration = structuredClone(data);
        // this line could be omitted, but it gives visual feedback
        dataAfterHydration.nouns += "\nthis word should be black, not red";
        localData.value = dataAfterHydration;
      },
      { strategy: "document-ready" }
    );

    return null;
  }
);

function getWords(words: string) {
  return words.trim().split("\n");
}

export const RenderedWords = component$(
  ({ localData }: { localData: Signal<typeof data> }) => {
    return (
      <Page>
        {Object.entries(localData.value).map(([key, value]) => {
          return getWords(value).map((word, index) => (
            // <Word key={word + index} type={key as keyof typeof colors}>{word}</Word>
            <Word type={key as keyof typeof colors}>{word}</Word>
          ));
        })}
      </Page>
    );
  }
);

export const Page = component$(() => {
  useStylesScoped$(pageStyles);
  return (
    <section>
      <Slot />
    </section>
  );
});

export const Word = component$(({ type }: { type: keyof typeof colors }) => {
  useStylesScoped$(wordStyles);
  return (
    <div style={{ borderColor: colors[type] }}>
      <Slot />
    </div>
  );
});
