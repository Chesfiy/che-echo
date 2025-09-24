"use client"
import { useMutation } from "convex/react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const adduser = useMutation(api.users.add); 

  return (
    
    <div className="flex flex-col  items-center justify-center min-h-svh">
        <h1 className="text-2xl font-bold">Hello World/web</h1>
        <UserButton/>
        <OrganizationSwitcher hidePersonal/>
        <Button onClick={() => adduser()}>Add User</Button>
    </div>
  )
}
