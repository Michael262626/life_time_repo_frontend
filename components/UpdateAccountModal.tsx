// components/UpdateAccountModal.tsx
'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { OccupationEnum } from "@/enums/OccupationEnum"

interface UpdateAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (id: string, data: { firstName: string; lastName: string; occupation: string }) => void; // Update here
    account: {
      id: string;
      firstName: string;
      lastName: string;
      occupation: string;
    } | null;
  }  

export const UpdateAccountModal = ({
  isOpen,
  onClose,
  onUpdate,
  account,
}: UpdateAccountModalProps) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [occupation, setOccupation] = useState("")

  useEffect(() => {
    if (account) {
      setFirstName(account.firstName)
      setLastName(account.lastName)
      setOccupation(account.occupation)
    }
  }, [account])

  const handleSubmit = () => {
    if (!account) return

    const requestData = {
        firstName,
        lastName,
        occupation,
      };

    onUpdate(account.id, requestData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Account</DialogTitle>
          <DialogDescription>
            Update the details of this account holder.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <div className="grid gap-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Select value={occupation} onValueChange={setOccupation}>
            <SelectTrigger id="occupation">
                <SelectValue placeholder="Select occupation" />
            </SelectTrigger>
            <SelectContent>
                {Object.values(OccupationEnum).map((job) => (
                <SelectItem key={job} value={job}>
                    {job}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
        </div>
    </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
