"use client";

import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api"; // Make sure this function is correctly implemented
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!newTaskValue.trim()) {
      // Add validation to avoid submitting empty values
      alert("Task cannot be empty!");
      return;
    }

    console.log("newTaskValue", newTaskValue);
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });

    setNewTaskValue("");
    setModalOpen(false);

    // Optionally, refresh the router if you need to reload the page or data
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full bg-red"
      >
        Add New Task +
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add New Task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
