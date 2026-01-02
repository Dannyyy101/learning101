'use client'
import dynamic from 'next/dynamic';

// Dynamically import the component with SSR disabled
const CytoscapeGraph = dynamic(() => import('../../components/CytoscapeCore'), {
  ssr: false,
  loading: () => <p>Loading Graph...</p>, // Optional loading state
});

export default function Page() {
  return (
      <div className='w-screen h-screen'>
        <CytoscapeGraph />
      </div>
  );
}