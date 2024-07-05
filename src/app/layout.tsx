// import './globals.css';
import '@mantine/core/styles.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {
  MantineProvider,
  ColorSchemeScript,
  AppShell,
  Burger,
  Group,
  Skeleton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RiAncientGateFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zenji App',
  description: '檀家ツール',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <AppShell
            header={{ height: 80 }}
            // navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
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
            <AppShell.Main>
              {children}
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
