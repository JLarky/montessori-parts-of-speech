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
      Bellow you will find inputs that allow you to set custom word sets.
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
        const lsState = localStorage.getItem("_parts_state");
        if (lsState) {
          localData.value = JSON.parse(lsState);
        }
      },
      { strategy: "document-ready" }
    );

    return (
      <section class="print:hidden">
        <h2>
          Words{" "}
          <button
            onClick$={() => {
              const value = prompt(
                "Enter JSON that you got from Export button"
              );
              if (value) {
                localData.value = JSON.parse(value);
                localStorage.setItem(
                  "_parts_state",
                  JSON.stringify(localData.value)
                );
              }
            }}
          >
            Import
          </button>{" "}
          <button
            onClick$={() => {
              const value = JSON.stringify(localData.value);
              prompt("Copy this JSON so you can import it later", value);
            }}
          >
            Export
          </button>
        </h2>
        {Object.entries(localData.value).map(([key, value]) => {
          return (
            <section class="my-text" key={key}>
              <h3>{key}</h3>
              <textarea
                value={value}
                style={{ borderColor: colors[key as keyof typeof colors] }}
                onInput$={(_, el) => {
                  localData.value = {
                    ...localData.value,
                    [key]: el.value,
                  };
                  localStorage.setItem(
                    "_parts_state",
                    JSON.stringify(localData.value)
                  );
                }}
              />
            </section>
          );
        })}
      </section>
    );
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
            <Word key={word + index} type={key as keyof typeof colors}>
              {word}
            </Word>
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
