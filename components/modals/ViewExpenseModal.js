import { useContext, Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { financeContext } from "@/lib/store/finance-context";
import { toast } from "react-toastify";

import Modal from "@/components/Modal";
import { currencyFormatter } from "@/lib/utils";

import { FaRegTrashAlt } from "react-icons/fa";

function ViewExpenseModal({ show, onClose, expense }) {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [open, setOpen] = useState(true)
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(financeContext);

  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
      toast.success("Expense category deleted");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteExpenseItemHandler = async (item) => {
    try {
      //  Remove the item from the list
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      // Update the expense balance
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await deleteExpenseItem(updatedExpense, expense.id);
      toast.success("Expense item successfully deleted");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-gray-700 py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 capitalize">
                          {expense.title} Expense History
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="mb-4 p-2 font-bold rounded-full bg-slate-600 mx-auto"
                            onClick={() => onClose(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="-mx-2 -my-2 overflow-x-auto sm:-mx-3 lg:-mx-4">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">Date</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Amount</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {expense.items.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                              {item.createdAt.toMillis
                                ? new Date(item.createdAt.toMillis()).toLocaleDateString('en-UK', dateOptions)
                                : item.createdAt.toLocaleDateString('en-UK', dateOptions)
                              }
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              {currencyFormatter(item.amount)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <button
                                onClick={() => {
                                  deleteExpenseItemHandler(item);
                                }}
                              >
                                <FaRegTrashAlt />
                                <span className="sr-only">Delete, {item.amount}</span>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger inline-flex items-center mx-auto gap-x-2"
                      onClick={deleteExpenseHandler}
                    >
                      <FaRegTrashAlt className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                      Delete {expense.title} Category
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ViewExpenseModal;