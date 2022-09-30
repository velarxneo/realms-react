import { useRouter } from 'next/router';
import React from 'react';
import Layout from '@/components/Layout';
import { ArtBackground } from '@/components/map/ArtBackground';
import { MonsterDetailsPanel } from '@/components/panels/MonsterDetailsPanel';

export default function MonsterPage() {
  const router = useRouter();
  const { monsterId } = router.query;
  return (
    <Layout>
      <MonsterDetailsPanel
        key={monsterId as string}
        monsterId={parseInt(monsterId as string)}
      />
      <ArtBackground background="realm" />
    </Layout>
  );
}
