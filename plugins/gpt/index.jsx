const {
  observeDom,
  ui: {
    injectCss,
    Button,
    openModal,
    ModalRoot,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalSizes,
    Text,
    TextBox,
    ReactiveRoot,
    TextArea,
    ButtonLooks,
  },
  plugin: { store },
  util: { getFiber },
} = shelter;

let popupButton = null;
let unobserve = null;

const getMessageHistory = () => {
  const messageElements = document.querySelectorAll('div[class^="message-"]');

  const messages = [...messageElements].map((message) => ({
    username: message.querySelector("h3 > span > span")?.textContent,
    message: message.querySelector("div > div > div").textContent,
  }));

  return messages.reduce((acc, message) => {
    if (message.username) {
      acc.push(message);
    } else {
      acc[acc.length - 1].message += `\n${message.message}`;
    }
    return acc;
  }, []);
};

// Credits to yellowsink for this messagebar stuff
// https://github.com/yellowsink
const appendTextToMessagebar = (text) => {
  const elem = document.querySelector('[class*="slateContainer-"]');
  const fiber = getFiber(elem);
  const editor = fiber.child.pendingProps.editor;

  editor.insertText(text);
};

export function onLoad() {
  injectCss(`
  .label-spacing {
    margin-bottom: .125rem;
  }
  .mb-2 {
    margin-bottom: .5rem;
  }
  
  .pr-2 {
    padding-right: .5rem;
  }`);

  let closeModal = null;
  const openGenerationModal = async () => {
    let hasValidKey = store.openaiKey?.startsWith("sk-");
    let savedModel = store.model || "gpt-3.5-turbo";

    let model = savedModel;
    let prompt = "";
    closeModal = openModal((p) => (
      <ModalRoot size={ModalSizes.SMALL}>
        <ModalHeader close={() => closeModal()}>Generate Response</ModalHeader>
        <ModalBody>
          <div className="pr-2">
            <div className="mb-2 flex">
              <div className="label-spacing">
                <Text>Model</Text>
              </div>
              <TextBox
                placeholder="gpt-3.5-turbo"
                value={savedModel}
                onInput={(e) => {
                  model = e;
                }}
              />
            </div>
            <div className="label-spacing">
              <Text>Prompt</Text>
            </div>
            <TextArea
              width="100%"
              value=""
              placeholder="Prompt"
              onInput={(e) => {
                prompt = e;
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div
            style={{
              display: "flex",
            }}
          >
            <Button
              grow={true}
              onClick={async () => {
                closeModal();

                const myUsername = document.querySelector(
                  "[class^=nameTag] > div"
                ).textContent;

                store.model = model;

                const messages = [
                  ...getMessageHistory()
                    .slice(-7)
                    .map((message) => ({
                      role: "user",
                      content: `${message.username}: ${message.message}`,
                    })),
                  {
                    role: "system",
                    content: `generate a response as "${myUsername}" according to the prompt: "${prompt}"`,
                  },
                ];

                fetch("https://api.openai.com/v1/chat/completions", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${store.openaiKey}`,
                  },
                  body: JSON.stringify({
                    model,
                    messages,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    const response = res.choices[0].message.content;
                    appendTextToMessagebar(
                      response
                        .replace(/^(?=.{0,49}:)([\w\s\-]+?[^ ]):/, "")
                        .trim()
                    );
                  });
              }}
            >
              Generate
            </Button>
            <Button
              look={ButtonLooks.LINK}
              grow={true}
              onClick={() => {
                // i am not designing this...
                const key = window.prompt("Enter your OpenAI key");
                store.openaiKey = key;
                hasValidKey = true;
              }}
            >
              {hasValidKey ? "Change" : "Set"} OpenAI key
            </Button>
          </div>
        </ModalFooter>
      </ModalRoot>
    ));
  };

  unobserve = observeDom(
    '[class^="channelTextArea"] [class^="buttons"]',
    (node) => {
      if (document.querySelector("#generate-button")) return;
      const secondLastChild = node.lastChild.previousSibling;
      popupButton = node.insertBefore(
        <ReactiveRoot>
          <div className={secondLastChild.className} id="generate-button">
            <button
              onClick={openGenerationModal}
              className={secondLastChild.firstChild.className}
            >
              <div className={secondLastChild.firstChild.firstChild.className}>
                <svg
                  viewBox="0 0 315.8 320"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="m294.9 131c7.3-21.8 4.8-45.7-6.9-65.5-17.5-30.4-52.6-46-86.8-38.7-15.2-17.2-37.1-26.9-60.1-26.8-35 0-66.1 22.5-76.9 55.8-22.5 4.6-41.9 18.7-53.3 38.7-17.6 30.3-13.6 68.5 9.9 94.5-7.3 21.8-4.8 45.7 6.9 65.5 17.5 30.4 52.6 46 86.8 38.7 15.2 17.2 37.2 27 60.1 26.8 35.1 0 66.2-22.5 76.9-55.9 22.5-4.6 41.9-18.7 53.3-38.7 17.6-30.3 13.5-68.5-9.9-94.5zm-120.3 168.1c-14 0-27.6-4.9-38.4-13.9.5-.3 1.3-.7 1.9-1.1l63.7-36.8c3.3-1.9 5.3-5.3 5.2-9.1v-89.8l26.9 15.6c.3.1.5.4.5.7v74.4c0 33.1-26.8 59.9-59.9 60zm-128.8-55c-7-12.1-9.6-26.4-7.2-40.2.5.3 1.3.8 1.9 1.1l63.7 36.8c3.2 1.9 7.2 1.9 10.5 0l77.8-44.9v31.1c0 .3-.1.6-.4.8l-64.4 37.2c-28.7 16.5-65.3 6.7-81.9-21.9zm-16.8-139.1c7-12.2 18-21.5 31.2-26.3v2.2 73.6c0 3.7 2 7.2 5.2 9.1l77.8 44.9-26.9 15.6c-.3.2-.6.2-.9 0l-64.4-37.2c-28.6-16.6-38.5-53.2-22-81.9zm221.3 51.5-77.8-44.9 26.9-15.5c.3-.2.6-.2.9 0l64.4 37.2c28.7 16.6 38.5 53.3 21.9 81.9-7 12.1-18 21.4-31.2 26.3v-75.8c0-3.7-2-7.2-5.2-9.1zm26.8-40.3c-.5-.3-1.3-.8-1.9-1.1l-63.7-36.8c-3.2-1.9-7.2-1.9-10.5 0l-77.8 44.9v-31.1c0-.3.1-.6.4-.8l64.4-37.2c28.7-16.5 65.4-6.7 81.9 22 7 12.1 9.5 26.3 7.1 40.1zm-168.5 55.4-26.9-15.6c-.3-.1-.5-.4-.5-.7v-74.4c0-33.1 26.9-60 60-59.9 14 0 27.6 4.9 38.3 13.9-.5.3-1.3.7-1.9 1.1l-63.7 36.8c-3.3 1.8-5.3 5.3-5.2 9.1v89.8s0 0 0 0zm14.6-31.5 34.7-20 34.7 20v40l-34.6 20-34.7-20v-40z" />
                </svg>
              </div>
            </button>
          </div>
        </ReactiveRoot>,
        node.firstChild
      );
    }
  );
}

export function onUnload() {
  unobserve();
  popupButton?.remove();
}
