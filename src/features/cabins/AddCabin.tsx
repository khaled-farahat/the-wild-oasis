import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import CabinTable from "./CabinTable";

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
