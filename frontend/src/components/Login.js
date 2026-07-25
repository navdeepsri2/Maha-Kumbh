import React from 'react';
import { SignIn } from "@clerk/clerk-react";
import { Helmet } from 'react-helmet-async';

export default function Login() {
  return (
    <div>
      <Helmet>
        <title>Maha Kumbh - Login </title>
      </Helmet>
      <section className="login-center">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <SignIn routing="path" path="/login" signUpUrl="/signup" />
        </div>
      </section>
    </div>
  );
}
