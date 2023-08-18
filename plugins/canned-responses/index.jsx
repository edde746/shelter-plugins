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
    ButtonColors,
    ButtonSizes,
    TextArea,
    TextBox,
    niceScrollbarsClass,
    showToast,
  },
  plugin: { store },
  util: { getFiber },
} = shelter;

if (!store.responses) store.responses = [];

let closeManagementModal = null;
const managementModal = () => (
  <ModalRoot size={ModalSizes.MEDIUM}>
    <ModalHeader close={() => closeManagementModal()}>
      Canned Responses
    </ModalHeader>
    <ModalBody>
      <div className="pr-2">
        <div className="add-response">
          <Button
            onClick={() => {
              store.responses.push({
                id: Math.random().toString(36).substring(7),
                name: "New Response",
                content: "",
              });
            }}
            grow={true}
            style={{ width: "100%" }}
          >
            Add Response
          </Button>
        </div>
        {store.responses.map((response) => (
          <div className="response">
            <div className="header">
              {/* <h3>{response.name}</h3> */}
              <TextBox
                value={response.name}
                placeholder="Response name"
                onInput={(value) => {
                  const index = store.responses.findIndex(
                    ({ id }) => id === response.id
                  );
                  store.responses[index].name = value;
                }}
              />
              <div className="buttons">
                <Button
                  color={ButtonColors.RED}
                  size={ButtonSizes.MEDIUM}
                  onClick={() => {
                    store.responses.splice(
                      store.responses.findIndex(({ id }) => id === response.id),
                      1
                    );

                    store.responses = [...store.responses];
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
            <TextArea
              value={response.content}
              placeholder="Message content"
              onInput={(value) => {
                const index = store.responses.findIndex(
                  ({ id }) => id === response.id
                );
                store.responses[index].content = value;
              }}
            />
          </div>
        ))}
      </div>
    </ModalBody>
    <ModalFooter>
      <div className="buttons-container">
        <Button
          onClick={() => {
            // copy store.responses to clipboard
            navigator.clipboard.writeText(JSON.stringify(store.responses));
            showToast({
              title: "Exported",
              content: "Canned responses copied to clipboard",
              duration: 3000,
            });
          }}
          grow={true}
        >
          Export
        </Button>
        <Button
          onClick={async () => {
            // import store.responses from clipboard
            const text = await navigator.clipboard.readText();
            store.responses = JSON.parse(text);
          }}
          grow={true}
        >
          Import
        </Button>
      </div>
    </ModalFooter>
  </ModalRoot>
);

// Credits to yellowsink for this messagebar stuff
// https://github.com/yellowsink
const appendTextToMessagebar = (text) => {
  const elem = document.querySelector('[class*="slateContainer-"]');
  const fiber = getFiber(elem);
  const editor = fiber.child.pendingProps.editor;

  editor.insertText(text);
};

let sendingPopup = null;
let popupButton = null;
const toggleSendingPopup = () => {
  if (sendingPopup) {
    sendingPopup.remove();
    sendingPopup = null;
    return;
  }

  const popupButtonPosition = popupButton.getBoundingClientRect();

  sendingPopup = document.body.appendChild(
    <div
      className="send-popout"
      style={{
        top: `${popupButtonPosition.top + (popupButtonPosition.height + 18)}px`,
        left: `${popupButtonPosition.left + popupButtonPosition.width / 2}px`,
        transform: `translate(-50%, calc(-100% - ${
          popupButtonPosition.height + 18
        }px))`,
        width: "300px",
      }}
    >
      <div className="header">
        <h3>Canned Responses</h3>
        <Button
          onClick={() => {
            toggleSendingPopup();
            closeManagementModal = openModal((p) => managementModal());
          }}
        >
          Manage
        </Button>
      </div>

      <div className="body">
        {store.responses.length > 0 ? (
          <div
            style={{
              display: "grid",
              gap: ".5rem",
            }}
            className={`${niceScrollbarsClass()} send-responses`}
          >
            {store.responses.map((response) => (
              <Button
                size={ButtonSizes.MEDIUM}
                color={ButtonColors.SECONDARY}
                style={{ width: "100%" }}
                grow={true}
                onClick={() => {
                  console.log(response.content);
                  appendTextToMessagebar(response.content);
                  toggleSendingPopup();
                }}
              >
                {response.name}
              </Button>
            ))}
          </div>
        ) : (
          <div className="no-responses">
            <h4>No canned responses</h4>
            <p>Click the "Manage" button to add some.</p>
          </div>
        )}
      </div>
    </div>
  );

  const closeOnOutsideClick = (e) => {
    if (sendingPopup?.contains(e.target)) return;
    sendingPopup?.remove();
    sendingPopup = null;
    document.removeEventListener("click", closeOnOutsideClick);
  };

  document.addEventListener("click", closeOnOutsideClick);
};

let unobserve = null;
export function onLoad() {
  injectCss(`
.buttons-container {
  display: flex;
  gap: .5rem;
}

  .send-responses {
    max-height: 200px;
    overflow-y: auto;
  }
.response .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .25rem;
}

.response {
  margin-bottom: .5rem;
}

.add-response {
  margin-bottom: .75rem;
}

.send-popout {
	  background: var(--modal-background);
	color: var(--text-normal);
	border-radius: 4px;
	padding: var(--spacing-16);
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: 1000;
	box-shadow: var(--elevation-stroke),var(--elevation-high);
}

.send-popout .header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.send-popout .header h3 {
	font-size: 1.1rem;
	font-weight: 600;
}

.send-popout .body {
	margin-top: var(--spacing-16);
}

.no-responses {
	text-align: center;
}

.no-responses h4 {
	font-size: 1.06rem;
	font-weight: 600;
}

.no-responses p {
	margin-top: 0;
	color: var(--text-muted);
}

.pr-2 {
  padding-right: .5rem;
}
`);

  unobserve = observeDom(
    '[class^="channelTextArea"] [class^="buttons"]',
    (node) => {
      if (document.querySelector("#canned-responses")) return;
      const secondLastChild = node.lastChild.previousSibling;
      popupButton = node.insertBefore(
        <div className={secondLastChild.className} id="canned-responses">
          <button
            onClick={toggleSendingPopup}
            className={secondLastChild.firstChild.className}
          >
            <div className={secondLastChild.firstChild.firstChild.className}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="22"
                height="22"
                fill="currentColor"
              >
                <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
              </svg>
            </div>
          </button>
        </div>,
        node.firstChild
      );
    }
  );
}

export function onUnload() {
  unobserve();
  //   popupButton.remove();
  sendingPopup?.remove();
}
