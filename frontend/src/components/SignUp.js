import React from 'react';
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Helmet } from 'react-helmet-async';

export default function SignUp() {
  return (
    <div>
      <Helmet>
        <title>Maha Kumbh - SignUp</title>
      </Helmet>
      <section className="login-center">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <ClerkSignUp routing="path" path="/signup" signInUrl="/login" />
        </div>
      </section>
    </div>
  );
}
