import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

const AddDanka = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="檀家追加">
        Modal Content
      </Modal>

      <Button onClick={open}>檀家追加</Button>
    </>
  );
}

export default AddDanka;
