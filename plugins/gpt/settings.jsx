const {
  plugin: { store },
  ui: { TextBox, Text },
} = shelter;

export default () => (
  <>
    <Text>OpenAI Key</Text>
    <TextBox
      placeholder="sk-..."
      value={store.openaiKey}
      onInput={(value) => {
        store.openaiKey = value;
      }}
    />
  </>
);
