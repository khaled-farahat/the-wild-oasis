import { useForm, FieldErrors } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import FormRow from "@/ui/FormRow";
import { createCabin } from "@/services/apiCabins";
import { Cabin } from "@/types";

type NonNullableCabin = {
  [K in keyof Cabin]: NonNullable<Cabin[K]>;
};

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<NonNullableCabin>({
      defaultValues: {
        name: "",
        maxCapacity: 0,
        regularPrice: 0,
        discount: 0,
        description: "",
        image: "",
      },
    });

  const { errors } = formState;

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data: Cabin) {
    mutate(data);
  }

  function onError(errors: FieldErrors<NonNullableCabin>) {
    // console.log(errors);
    if (errors) return;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1 person" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1 person" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
            validate: (value: number) =>
              value <= getValues("regularPrice") ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>Add cabin</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
