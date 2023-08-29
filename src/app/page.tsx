'use client';

import { useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  Burger,
  Group,
  Skeleton,
} from '@mantine/core';
import { RiAncientGateFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';


export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 80 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        transitionDuration={0}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <IconContext.Provider value={{ size: '32px' }}>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <RiAncientGateFill />
              <h1>Zenji -禅師-</h1>
            </IconContext.Provider>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main>Main</AppShell.Main>
      </AppShell>
    </>
  );
}
