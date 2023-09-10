'use client';

import { useMemo, Suspense } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  Burger,
  Group,
  Skeleton,
} from '@mantine/core';
import { RiAncientGateFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';

import { useQuery, gql } from 'urql';
import { UrqlProvider, ssrExchange, createClient, cacheExchange, fetchExchange } from '@urql/next';
// import { graphql } from '@/gql';
import { registerUrql } from '@urql/next/rsc';

// const { getClient } = registerUrql(client);

const allDankasQueryDocument = gql`
  query allDankasQuery {
    dankaModels {
      danka_uuid
      last_name_of_family_head
      first_name_of_family_head
    }
  }
`;

export default function Home() {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: 'http://localhost:8080/graphql',
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    });

    return [client, ssr];
  }, []);

  const [opened, { toggle }] = useDisclosure();

  // const result = getClient().query(allDankasQueryDocument, {});

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
        <AppShell.Main>
          Main

          <UrqlProvider client={client} ssr={ssr}>
            <Suspense>
              <TestList />
            </Suspense>
          </UrqlProvider>
          {/*
          {result.data &&
            <ul>
              {result.data.dankaModels?.map((x: any) => (
                x?.danka_uuid && <li key={x.danka_uuid}>{x.last_name_of_family_head} {x.first_name_of_family_head}</li>
              ))}
            </ul>
          }
          */}
        </AppShell.Main>
      </AppShell>
    </>
  );
}

const TestList = () => {
  const [result] = useQuery({ query: allDankasQueryDocument });
  return (
    result.data &&
    <ul>
      {result.data.dankaModels?.map((x: any) => (
        x?.danka_uuid && <li key={x.danka_uuid}>{x.last_name_of_family_head} {x.first_name_of_family_head}</li>
      ))}
    </ul>
  );
};
