import { SignIn } from "@clerk/nextjs";
import React from 'react'
import { SignedIn } from '@clerk/clerk-react';

export const signinPage = () => {
  return (
    <div>
        <SignIn/>
    </div>
  )
}
