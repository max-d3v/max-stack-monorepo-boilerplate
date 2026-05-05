"use client";

import type { AuthUser } from "@workspace/types/use-cases/users";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import { EditProfileModal } from "./edit-profile-modal";

interface EditProfileButtonProps {
  readonly user: AuthUser;
}

export function EditProfileButton({ user }: EditProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="sm" variant="outline">
        Edit Profile
      </Button>
      <EditProfileModal onOpenChange={setIsOpen} open={isOpen} user={user} />
    </>
  );
}
