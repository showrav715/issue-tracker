import { Flex, Button, Table } from "@radix-ui/themes";
import Link from "next/link";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/issue", {
    next: { revalidate: 0 },
  });
  const data = await res.json();

  return (
    <>
      <div className="container px-44">
        <Flex direction="column" gap="4">
          <Link href="/issues/create">
            <Button ml="3" className="w-32">
              Create Issue
            </Button>
          </Link>

          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data?.map(
                (issue: { title: string; description: string; id: number }) => (
                  <Table.Row key={issue.id}>
                    <Table.RowHeaderCell>{issue?.title}</Table.RowHeaderCell>
                    <Table.Cell>{issue?.description}</Table.Cell>
                    <Table.Cell>Auction</Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table.Root>
        </Flex>
      </div>
    </>
  );
}
