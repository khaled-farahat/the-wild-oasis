import { useForm, FieldErrors } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import FormRow from "@/ui/FormRow";

import { createEditCabin } from "@/services/apiCabins";
import { Cabin, NewCabinType } from "@/types";

type NewCabinTypeWithFileList = Omit<NewCabinType, "image"> & {
  image: FileList | string;
};

type CreateCabinFormProps = {
  cabinToEdit?: Cabin;
};

function CreateCabinForm({ cabinToEdit }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<NewCabinTypeWithFileList>({
      defaultValues: isEditSession
        ? {
            name: (editValues as Cabin).name || "",
            maxCapacity: (editValues as Cabin).maxCapacity || 0,
            regularPrice: (editValues as Cabin).regularPrice || 0,
            discount: (editValues as Cabin).discount || 0,
            description: (editValues as Cabin).description || "",
            image: (editValues as Cabin).image || "",
          }
        : {},
    });

  const { errors } = formState;

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: NewCabinType;
      id: number;
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data: NewCabinTypeWithFileList) {
    // mutate({ ...data, image: data.image?.[0] });
    const image = data.image instanceof FileList ? data.image[0] : data.image;
    if (isEditSession) {
      editCabin({
        newCabinData: { ...data, image },
        id: editId as number,
      });
    } else {
      createCabin({ ...data, image });
    }
  }

  function onError(errors: FieldErrors<NewCabinTypeWithFileList>) {
    // console.log(errors);
    if (errors) return;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Add cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
