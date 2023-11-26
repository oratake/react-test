import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Group,
  Button,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, gql } from 'urql';

const ADD_DANKA_MUTATAION = gql`
  mutation AddDankaMutation($input: InitialDankaInput!) {
    createDanka(input: $input) {
      last_name_of_family_head
      first_name_of_family_head
      email
    }
  }
`;

const AddDanka = () => {
  const [createDankaResult, createDanka] = useMutation(ADD_DANKA_MUTATAION);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      last_name_of_family_head: '',
      first_name_of_family_head: '',
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'メールアドレスの書式が間違っています'),
    },
  });

  const handleCreateDanka = async (values) => {
    const { data } = await createDanka({ input: values });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="檀家追加">
        <form onSubmit={form.onSubmit((values) => handleCreateDanka(values))}>
          <Group>
            <TextInput
              label="姓"
              placeholder="姓"
              {...form.getInputProps('last_name_of_family_head')}
            />
            <TextInput
              label="名"
              placeholder="名"
              {...form.getInputProps('first_name_of_family_head')}
            />
          </Group>
          <TextInput
            label="メールアドレス"
            placeholder="例: mail.address@example.com"
            {...form.getInputProps('email')}
          />
          <Button type="submit" radius="xl">
            登録
          </Button>
        </form>
      </Modal>

      <Button onClick={open}>檀家追加</Button>
    </>
  );
};

export default AddDanka;
