import React from 'react';

import { ValidationExample as RFFValidationExample } from './RFF/ValidationExample';
// import { Benchmark as RFFBenchmark } from './RFF/Benchmark';
import { ValidationExample as RHFValidationExample } from './RHF/ValidationExample';
// import { Benchmark as RHFBenchmark } from './RHF/Benchmark';

function App() {
  return (
    <main
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        justifyContent: 'center',
      }}
    >
      <section>
        <h2 style={{ textAlign: 'center' }}>React Final Form</h2>
        <RFFValidationExample />
      </section>
      <section>
        <h2 style={{ textAlign: 'center' }}>React Hook Form</h2>
        <RHFValidationExample />
      </section>
      {/*<section>*/}
      {/*  <h2 style={{ textAlign: 'center' }}>React Final Form</h2>*/}
      {/*  <RFFBenchmark />*/}
      {/*</section>*/}
      {/*<section>*/}
      {/*  <h2 style={{ textAlign: 'center' }}>React Hook Form</h2>*/}
      {/*  <RHFBenchmark />*/}
      {/*</section>*/}
    </main>
  );
}

export default App;
