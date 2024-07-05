'use client';

import { useMemo, Suspense } from 'react';
import {
  Table,
} from '@mantine/core';

import { useQuery, gql } from 'urql';
import { UrqlProvider, ssrExchange, createClient, cacheExchange, fetchExchange } from '@urql/next';
// import { graphql } from '@/gql';
import { registerUrql } from '@urql/next/rsc';

// const { getClient } = registerUrql(client);
import AddDanka from '@/components/AddDankaButtonAndModal';

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
  // const result = getClient().query(allDankasQueryDocument, {});
  return (
    <>
      <h2>檀家一覧</h2>
      <UrqlProvider client={client} ssr={ssr}>
        <AddDanka />
        <Suspense>
          <TestList />
        </Suspense>
      </UrqlProvider>
    </>
  );
}

const TestList = () => {
  const [result] = useQuery({ query: allDankasQueryDocument });
  const DankaTableRowList = result.data &&
    result.data.dankaModels?.map((x: any) => (
      x?.danka_uuid &&
      <Table.Tr key={x.danka_uuid}>
        <Table.Td>{x.danka_uuid}</Table.Td>
        <Table.Td>
          {x.last_name_of_family_head} {x.first_name_of_family_head}
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>UUID(開発用)</Table.Th>
          <Table.Th>名前</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{DankaTableRowList}</Table.Tbody>
    </Table>
  );
};
