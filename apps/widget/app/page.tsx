"use client"
import { useMutation, useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api";
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button";


export default function Page() {
  const users = useQuery(api.users.getMany);
  const adduser = useMutation(api.users.ad); 
  return (
    <div className="flex flex-col  items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">App/Widget</h1>
        <Button onClick={() => adduser()}>Add User</Button>
        {JSON.stringify(users)}
      </div>
    </div>
  )
}
