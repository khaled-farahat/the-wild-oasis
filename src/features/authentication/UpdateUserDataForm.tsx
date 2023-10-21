import { useState } from "react";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "@/ui/SpinnerMini";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const { email, user_metadata } = user ?? {};
  const { fullName: currentFullName } = user_metadata ?? {};

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<null | File | undefined>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName) {
      return;
    }

    updateUser(
      { fullName, avatar: avatar ?? undefined },
      {
        onSuccess: () => {
          setAvatar(null);
          if (e.target instanceof HTMLFormElement) e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files?.[0])}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            type="reset"
            onClick={handleCancel}
            variation="secondary"
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>
            {!isUpdating ? "Update account" : <SpinnerMini />}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
